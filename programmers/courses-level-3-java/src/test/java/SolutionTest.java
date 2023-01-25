import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SolutionTest {
    @Test
    public void testLessons43105() {
        var solution = new com.programmers.coding.test.lessons_43105.Solution();
        assertEquals(30, solution.solution(new int[][] {{7}, {3, 8}, {8, 1, 0}, {2, 7, 4, 4}, {4, 5, 2, 6, 5}}));
    }

    @Test
    public void testLessons43163() {
        var solution = new com.programmers.coding.test.lessons_43163.Solution();

        assertEquals(4, solution.solution("hit", "cog", new String[] {"hot", "dot", "dog", "lot", "log", "cog"}));
        assertEquals(0, solution.solution("hit", "cog", new String[] {"hot", "dot", "dog", "lot", "log"}));
    }

    @Test
    public void testLessons43162() {
        var solution = new com.programmers.coding.test.lessons_43162.Solution();

        assertEquals(2, solution.solution(3, new int[][] { {1, 1, 0}, {1, 1, 0}, {0, 0, 1} }));
        assertEquals(1, solution.solution(3, new int[][] { {1, 1, 0}, {1, 1, 1}, {0, 1, 1} }));
    }
}
