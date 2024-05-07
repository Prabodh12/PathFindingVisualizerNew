function isEqual(finish, node) {
    for (var i = 0; i < finish.length; i++) {
        if (finish[i] != node[i]) {
            return false;
        }
    }
    return true;
}

function BFS(row, column, node, visited, finish, animation, path, dist) {
    var q = [
        [node[0], node[1]]
    ];
    
    //console.log(node,finish)
    while (!isEqual(finish, node)) {
        //console.log("QUEUE:",q)
        node = q.shift()
        
        //console.log(visited)
        if (node == undefined) {
            break
        }
        if (visited[node[0]][node[1]] == 0) {
            if (node[0] + 1 >= 0 && node[0] + 1 < row && visited[node[0] + 1][node[1]] == 0) {
                q.push([node[0] + 1, node[1]])
                dist[node[0]+1][node[1]]=dist[node[0]][node[1]]+1
                path[node[0]+1][node[1]]=[node[0],node[1]]
            }
            if (node[1] + 1 >= 0 && node[1] + 1 < column && visited[node[0]][node[1] + 1] == 0) {
                q.push([node[0], node[1] + 1])
                dist[node[0]][node[1]+1]=dist[node[0]][node[1]]+1
                path[node[0]][node[1]+1]=[node[0],node[1]]
            }
            if (node[0] - 1 >= 0 && node[0] - 1 < row && visited[node[0] - 1][node[1]] == 0) {
                q.push([node[0] - 1, node[1]])
                dist[node[0]-1][node[1]]=dist[node[0]][node[1]]+1
                path[node[0]-1][node[1]]=[node[0],node[1]]
            }
            if (node[1] - 1 >= 0 && node[1] - 1 < column && visited[node[0]][node[1] - 1] == 0) {
                q.push([node[0], node[1] - 1])
                dist[node[0]][node[1]-1]=dist[node[0]][node[1]]+1
                path[node[0]][node[1]-1]=[node[0],node[1]]
            }
            //q.push([node[0]+1,node[1]],[node[0],node[1]+1],[node[0]-1,node[1]],[node[0],node[1]-1]);
            visited[node[0]][node[1]] = 1
            animation.push(node);
            //console.log(node)
        }
    }
    //console.log(path.length)
    var curr = path[finish[0]][finish[1]];
    var ans = [[finish[0],finish[1]]];
    while(curr.length!=0){
        ans.push(curr)
        //console.log(curr)
        if(curr.length!=0){
            curr = path[curr[0]][curr[1]]
        }
        
        
    }
    //console.log(ans)
    return ans
}

export function BFSSearch(rows, column, start, finish, wall) {
    var visited = [];
    var path = [];
    var dist = [];
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
    for(var i=0;i<wall.length;i++){
        visited[wall[i][0]][wall[i][1]]=1
    }
    var ans = BFS(rows, column, start, visited, finish, animation, path, dist);
   // console.log(animation);
   return [animation,ans]
}

//BFSSearch(6,6,[3,1],[3,2])
//console.log(visited)
// s = [3, 1];
// finish = [3, 2];
