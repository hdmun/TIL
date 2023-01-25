package com.programmers.coding.test.lessons_43162;

import java.util.Arrays;
import java.util.Stack;

class Node {
    private final int computerNo;

    public int computerNo() {
        return computerNo;
    }

    private Node(int computerNo) {
        this.computerNo = computerNo;
    }

    public static Node of(int computerNo) {
        return new Node(computerNo);
    }
}

public class Solution {
    public int solution(int n, int[][] computers) {
        int answer = 0;

        final boolean[] visited = new boolean[n];
        Arrays.fill(visited, false);

        for (int computerNo = 0; computerNo < n; computerNo++) {
            if (visited[computerNo]) {
                continue;
            }

            search(computerNo, computers, visited);
            answer++;
        }

        return answer;
    }

    private void search(int startNode, int[][] computers, boolean[] visited) {
        Stack<Node> stack = new Stack<>();
        stack.push(Node.of(startNode));
        visited[startNode] = true;

        while (!stack.isEmpty()) {
            var node = stack.pop();
            final int computerNo = node.computerNo();

            for (int to = 0; to < computers.length; ++to) {
                if (to == computerNo) {
                    continue;
                }
                if (visited[to]) {
                    continue;
                }

                if (computers[computerNo][to] == 1) {
                    visited[to] = true;
                    stack.push(Node.of(to));
                }
            }
        }
    }
}