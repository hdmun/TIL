import com.programmers.coding.test.lesson_147355.Solution;
import org.junit.jupiter.api.Test;

public class SolutionTest {
    @Test
    public void testSolution() {
        Solution solution = new Solution();

        assert 2 == solution.solution("3141592", "271");
        assert 8 == solution.solution("500220839878", "7");
        assert 3 == solution.solution("10203", "15");
    }
}
