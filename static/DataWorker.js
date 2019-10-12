/* eslint-disable */
onmessage = function (worker) {
  // 计算模型线框
  LoadJsonDataWorker.vertices = []
  LoadJsonDataWorker.faces = []
  LoadJsonDataWorker.computeEdgesGeometry(worker.data)
}

var LoadJsonDataWorker = {
  loadList: 0,
  vertices: [],
  faces: [],
  geoUUID: undefined,
  computeEdgesGeometry (data) {
    var _this = this
    for (var i = 0, j = 0; i < data.positions.length; i += 3, j += 2) {
      var v = new Vector3(data.positions[i], data.positions[i + 1], data.positions[i + 2])
      v.setIndex(this.vertices.length)
      this.vertices.push(v);
    }
    function addFace(a, b, c) {
      var face = new Face3(a, b, c);
      _this.faces.push(face);
    }
    if (data.face) {
      for (var i = 0; i < data.face.length; i += 3) {
        addFace(data.face[i], data.face[i + 1], data.face[i + 2]);
      }
    } else {
      for (var i = 0; i < data.positions.length / 3; i += 3) {
        addFace(i, i + 1, i + 2);
      }
    }
    this.geoUUID = data.geoUUID
    this.mergeVertices()
    this.computeFaceNormals()
    this.computeEdgesVertices()
  },
  mergeVertices: function () {

    var verticesMap = {};
    var unique = [],
      changes = [];

    var v, key;
    var precisionPoints = 4;
    var precision = Math.pow(10, precisionPoints);
    var i, il, face;
    var indices;

    for (i = 0, il = this.vertices.length; i < il; i++) {

      v = this.vertices[i];
      key = Math.round(v.x * precision) + '_' + Math.round(v.y * precision) + '_' + Math.round(v.z * precision);

      if (verticesMap[key] === undefined) {

        verticesMap[key] = i;
        unique.push(this.vertices[i]);
        changes[i] = unique.length - 1;

      } else {

        changes[i] = changes[verticesMap[key]];

      }

    }

    var faceIndicesToRemove = [];

    for (i = 0, il = this.faces.length; i < il; i++) {

      face = this.faces[i];

      face.a = changes[face.a];
      face.b = changes[face.b];
      face.c = changes[face.c];

      indices = [face.a, face.b, face.c];

      // if any duplicate vertices are found in a Face3
      // we have to remove the face as nothing can be saved
      for (var n = 0; n < 3; n++) {

        if (indices[n] === indices[(n + 1) % 3]) {

          faceIndicesToRemove.push(i);
          break;

        }

      }

    }

    for (i = faceIndicesToRemove.length - 1; i >= 0; i--) {

      var idx = faceIndicesToRemove[i];

      this.faces.splice(idx, 1);

    }

    var diff = this.vertices.length - unique.length;
    this.vertices = unique;
    return diff;

  },
  computeFaceNormals: function () {
    var cb = new Vector3(),
      ab = new Vector3();
    for (var f = 0, fl = this.faces.length; f < fl; f++) {
      var face = this.faces[f];
      var vA = this.vertices[face.a];
      var vB = this.vertices[face.b];
      var vC = this.vertices[face.c];
      cb.subVectors(vC, vB);
      ab.subVectors(vA, vB);
      cb.crossVectors(cb, ab);
      cb.normalize();
      face.normal.copy(cb);
    }
  },
  computeEdgesVertices: function () {
    var indices = [];
    var thresholdDot = Math.cos((Math.PI / 180) * 1);
    var edge = [0, 0],
      edges = {},
      edge1, edge2;
    var key, keys = ['a', 'b', 'c'];
    for (var i = 0, l = this.faces.length; i < l; i++) {

      var face = this.faces[i];

      for (var j = 0; j < 3; j++) {

        edge1 = face[keys[j]];
        edge2 = face[keys[(j + 1) % 3]];
        edge[0] = Math.min(edge1, edge2);
        edge[1] = Math.max(edge1, edge2);

        key = edge[0] + ',' + edge[1];

        if (edges[key] === undefined) {

          edges[key] = {
            index1: edge[0],
            index2: edge[1],
            face1: i,
            face2: undefined
          };

        } else {

          edges[key].face2 = i;

        }

      }

    }

    // generate vertices
    let temVerX = 0 ,temVerY = 0,temVerZ = 0;
    for (key in edges) {

      var e = edges[key];

      // an edge is only rendered if the angle (in degrees) between the face normals of the adjoining faces exceeds this value. default = 1 degree.

      if (e.face2 === undefined || this.faces[e.face1].normal.dot(this.faces[e.face2].normal) <= thresholdDot) {

        if(e.face2 !== undefined) {
          temVerX = this.faces[e.face1].normal.x - this.faces[e.face2].normal.x;
          temVerY = this.faces[e.face1].normal.y - this.faces[e.face2].normal.y;
          temVerZ = this.faces[e.face1].normal.z - this.faces[e.face2].normal.z;
          //判断面是否 夹角 超过90度
          if(temVerX * temVerX + temVerY * temVerY + temVerZ * temVerZ < 1.8) {
            continue;
          }
        }
        var vertex = this.vertices[e.index1];
        indices.push(vertex.getIndex())

        vertex = this.vertices[e.index2];
        indices.push(vertex.getIndex())

      }
    }
    postMessage({
      geoUUID: this.geoUUID,
      indices: new Uint32Array(indices)
    })
  },
}


function Vector3(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;

  this.index = 0;
}
Object.assign(Vector3.prototype, {

  isVector3: true,

  setIndex: function (value) {
    this.index = value
  },

  getIndex: function () {
    return this.index
  },

  copy: function (v) {

    this.x = v.x;
    this.y = v.y;
    this.z = v.z;

    return this;

  },

  clone: function () {

    return new this.constructor(this.x, this.y, this.z);

  },

  subVectors: function (a, b) {

    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;

    return this;

  },

  crossVectors: function (a, b) {

    var ax = a.x,
      ay = a.y,
      az = a.z;
    var bx = b.x,
      by = b.y,
      bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;

  },

  normalize: function () {

    return this.divideScalar(this.length() || 1);

  },

  divideScalar: function (scalar) {

    return this.multiplyScalar(1 / scalar);

  },

  multiplyScalar: function (scalar) {

    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;

    return this;

  },

  length: function () {

    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

  },

  dot: function (v) {

    return this.x * v.x + this.y * v.y + this.z * v.z;

  }

});

function Face3(a, b, c, normal) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.normal = (normal && normal.isVector3) ? normal : new Vector3();
  this.vertexNormals = Array.isArray(normal) ? normal : [];
}
