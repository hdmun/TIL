import com.programmers.coding.test._43163.Solution;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SolutionTest {
    @Test
    public void testSolution() {
        Solution solution = new Solution();

        assertEquals(4, solution.solution("hit", "cog", new String[] {"hot", "dot", "dog", "lot", "log", "cog"}));
        assertEquals(0, solution.solution("hit", "cog", new String[] {"hot", "dot", "dog", "lot", "log"}));
    }
}
