package com.programmers.coding.test.lessons_12939;

public class Solution {
    public String solution(String s) {
        long max = Long.MIN_VALUE;
        long min = Long.MAX_VALUE;
        for (String numberStr : s.split(" ")) {
            final long number = Long.parseLong(numberStr);
            if (max < number) {
                max = number;
            }

            if (number < min) {
                min = number;
            }
        }
        return min + " " + max;
    }
}