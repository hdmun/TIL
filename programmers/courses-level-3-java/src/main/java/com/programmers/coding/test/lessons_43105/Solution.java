package com.programmers.coding.test.lessons_43105;

import java.util.Arrays;

public class Solution {
    public int solution(int[][] triangle) {
        final int triangleHeight = triangle.length;
        final int[] lastRow = triangle[triangleHeight - 1];
        final int[][] sumTable = new int[triangleHeight][lastRow.length];
        for (int[] row : sumTable) {
            Arrays.fill(row, 0);
        }
        sumTable[0][0] = triangle[0][0];

        for (int y = 1; y < triangleHeight; ++y) {
            final int[] triangleRow = triangle[y];
            final int rowLength = triangleRow.length;
            for (int x = 0; x < rowLength; ++x) {
                if (x == 0) {
                    sumTable[y][x] = triangleRow[x] + sumTable[y-1][0];
                } else if (y == x) {
                    sumTable[y][x] = triangleRow[x] + sumTable[y-1][x-1];
                } else {
                    final int left = triangleRow[x] + sumTable[y-1][x-1];
                    final int right = triangleRow[x] + sumTable[y-1][x];
                    sumTable[y][x] = Math.max(left, right);
                }
            }
        }

        return Arrays.stream(sumTable[sumTable.length-1]).max().getAsInt();
    }
}