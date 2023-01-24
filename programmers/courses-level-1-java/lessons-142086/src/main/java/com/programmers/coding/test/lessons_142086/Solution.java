package com.programmers.coding.test.lessons_142086;

import java.util.HashMap;

public class Solution {
    public int[] solution(String s) {
        final int sLength = s.length();
        int[] answer = new int[sLength];

        final HashMap<Character, Integer> charIndexMap = new HashMap<>();
        for (int i = 0; i < sLength; ++i) {
            char character = s.charAt(i);
            if (!charIndexMap.containsKey(character)) {
                answer[i] = -1;
                charIndexMap.put(character, i);
                continue;
            }

            Integer index = charIndexMap.get(character);
            answer[i] = i - index;
            charIndexMap.put(character, i);
        }
        return answer;
    }
}