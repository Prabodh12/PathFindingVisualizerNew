function isEqual(finish, node) {
  for (var i = 0; i < finish.length; i++) {
    if (finish[i] != node[i]) {
      return false;
    }
  }
  return true;
}

function minDist(dist, s) {
  var min = Infinity;
  var idx = null;
  for (var i = 0; i < s.length; i++) {
    if (dist[s[i][0]][s[i][1]] < min) {
      min = dist[s[i][0]][s[i][1]];
      idx = i;
    }
  }
  return idx
}

function Dijsktra(row, column, node, visited, finish, animation, path, dist, w) {
  var s = [node];
  path[node[0]][node[1]] = null;
  dist[node[0]][node[1]] = 0;
  while (!isEqual(finish, node)) {
    var idx = minDist(dist, s)
    node = s.splice(idx, 1)[0]
    if (node == undefined) {
      break
    }
    if (!(node.toString() in w)) {
      animation.push(node);
    }
    if (visited[node[0]][node[1]] == 0) {
      if (node[0] + 1 >= 0 && node[0] + 1 < row && visited[node[0] + 1][node[1]] == 0) {
        s.push([node[0] + 1, node[1]])
        if (node.toString() in w) {
          dist[node[0] + 1][node[1]] = dist[node[0]][node[1]] + 15
        } else {
          dist[node[0] + 1][node[1]] = dist[node[0]][node[1]] + 1
        }
        path[node[0] + 1][node[1]] = [node[0], node[1]]
      }
      if (node[1] + 1 >= 0 && node[1] + 1 < column && visited[node[0]][node[1] + 1] == 0) {
        s.push([node[0], node[1] + 1])
        if (node.toString() in w) {
          dist[node[0]][node[1] + 1] = dist[node[0]][node[1]] + 15
        } else {
          dist[node[0]][node[1] + 1] = dist[node[0]][node[1]] + 1
        }
        path[node[0]][node[1] + 1] = [node[0], node[1]]
      }
      if (node[1] - 1 >= 0 && node[1] - 1 < column && visited[node[0]][node[1] - 1] == 0) {
        s.push([node[0], node[1] - 1])
        if (node.toString() in w) {
          dist[node[0]][node[1] - 1] = dist[node[0]][node[1]] + 15
        } else {
          dist[node[0]][node[1] - 1] = dist[node[0]][node[1]] + 1
        }
        path[node[0]][node[1] - 1] = [node[0], node[1]]
      }
      if (node[0] - 1 >= 0 && node[0] - 1 < row && visited[node[0] - 1][node[1]] == 0) {
        s.push([node[0] - 1, node[1]])
        if (node.toString() in w) {
          dist[node[0] - 1][node[1]] = dist[node[0]][node[1]] + 15
        } else {
          dist[node[0] - 1][node[1]] = dist[node[0]][node[1]] + 1
        }
        path[node[0] - 1][node[1]] = [node[0], node[1]]
      }

      visited[node[0]][node[1]] = 1

    }
  }
  var curr = path[finish[0]][finish[1]];
  var ans = [
    [finish[0], finish[1]]
  ];
  while (curr != null && curr.length != 0) {
    //console.log(curr)
    if (curr != null && curr.length != 0) {
      ans.push(curr)
      //console.log("aya")
      curr = path[curr[0]][curr[1]]
    }
  }
  //console.log(ans)
  return ans
}

export function DijsktrasSearch(rows, column, start, finish, wall, weight) {
  var visited = [];
  var path = [];
  var dist = [];
  var w = {};
  var animation = [];
  for (var i = 0; i < rows; i++) {
    var temp = [];
    for (var j = 0; j < column; j++) {
      temp.push(0)
    }
    visited.push(temp);
  }
  for (var i = 0; i < rows; i++) {
    var temp = [];
    for (var j = 0; j < column; j++) {
      temp.push([])
    }
    path.push(temp);
  }
  for (var i = 0; i < rows; i++) {
    var temp = [];
    for (var j = 0; j < column; j++) {
      temp.push(Number.POSITIVE_INFINITY)
    }
    dist.push(temp);
  }
  for (var i = 0; i < wall.length; i++) {
    visited[wall[i][0]][wall[i][1]] = 1
  }
  //console.log(path)
  for (var i = 0; i < weight.length; i++) {
    if (!(weight[i].toString() in w)) {
      w[weight[i].toString()] = 15;
    }
  }
  console.log(w)
  var ans = Dijsktra(rows, column, start, visited, finish, animation, path, dist, w);
  // console.log(animation);
  return [animation, ans]
}
// var start = [0, 0]
// var finish = [3, 3]
// DijsktrasSearch(5, 5, start, finish)
//console.log(visited)
// s = [3, 1];
// finish = [3, 2];