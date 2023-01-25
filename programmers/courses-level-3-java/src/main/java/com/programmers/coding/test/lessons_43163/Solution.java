package com.programmers.coding.test.lessons_43163;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.Optional;
import java.util.Queue;

class Node {
    private final String word;
    private final int depth;

    public String word() { return word; }
    public int depth() { return depth; }

    private Node(String word, int depth) {
        this.word = word;
        this.depth = depth;
    }

    public static Node of(String word, int depth) {
        return new Node(word, depth);
    }
}

public class Solution {
    private boolean isChangeAlphabet(String s1, String s2) {
        if (s1.length() != s2.length()) {
            return false;
        }

        int count = 0;
        for (int i = 0; i < s1.length(); ++i) {
            if (s1.charAt(i) != s2.charAt(i)) {
                ++count;
            }
        }
        return count == 1;
    }

    public int solution(String begin, String target, String[] words) {
        final Optional<String> findTarget = Arrays.stream(words).filter(word -> word.equals(target)).findFirst();
        if (findTarget.isEmpty()) {
            return 0;
        }

        final int wordsCount = words.length;
        final boolean[] visited = new boolean[wordsCount];
        Arrays.fill(visited, false);

        final Queue<Node> queue = new LinkedList<>();
        queue.add(Node.of(begin, 0));

        int answer = 0;
        while (!queue.isEmpty()) {
            Node node = queue.poll();
            if (isChangeAlphabet(node.word(), target)) {
                answer = node.depth() + 1;
                break;
            }

            for (int i = 0; i < wordsCount; ++i) {
                if (visited[i]) {
                    continue;
                }

                String word = words[i];
                if (isChangeAlphabet(node.word(), word)) {
                    visited[i] = true;
                    queue.add(Node.of(word, node.depth() + 1));
                    break;
                }
            }
        }

        return answer;
    }
}