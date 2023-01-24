import com.programmers.coding.test.lessons_12939.Solution;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SolutionTest {
    @Test
    public void testSolution()  {
        Solution solution = new Solution();
        assertEquals("1 4", solution.solution("1 2 3 4"));
        assertEquals("-4 -1", solution.solution("-1 -2 -3 -4"));
        assertEquals("-1 -1", solution.solution("-1 -1"));
    }
}
