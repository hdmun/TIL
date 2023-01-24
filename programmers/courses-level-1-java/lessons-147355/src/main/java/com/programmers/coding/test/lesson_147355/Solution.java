package com.programmers.coding.test.lesson_147355;

public class Solution {
    public int solution(String t, String p) {
        int answer = 0;

        final long pNumber = Long.parseLong(p);
        final int pLength = p.length();
        final int tLength = t.length();
        for (int i = 0; i < tLength; ++i) {
            final int length = i + pLength;
            if (tLength < length) {
                break;
            }

            final String slice = t.substring(i, length);
            final long number = Long.parseLong(slice);
            if (number <= pNumber) {
                ++answer;
            }
        }
        return answer;
    }
}
