import com.programmers.coding.test.lessons_142086.Solution;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

public class SolutionTest {

    @Test
    public void testSolution() {
        Solution solution = new Solution();
        assertArrayEquals(new int[] {-1, -1, -1, 2, 2, 2}, solution.solution("banana"));
        assertArrayEquals(new int[] {-1, -1, 1, -1, -1, -1}, solution.solution("foobar"));
    }
}
