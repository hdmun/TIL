import net.acmicpc.problem._7576.Main;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStreamReader;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class SolutionTest {
    @Test
    public void testSolution() {
        try {
            String input = "6 4\n" +
                    "0 0 0 0 0 0\n" +
                    "0 0 0 0 0 0\n" +
                    "0 0 0 0 0 0\n" +
                    "0 0 0 0 0 1";
            assertEquals(8, Main.setup(new InputStreamReader(new java.io.ByteArrayInputStream(input.getBytes()))));

            input = "6 4\n" +
                    "0 -1 0 0 0 0\n" +
                    "-1 0 0 0 0 0\n" +
                    "0 0 0 0 0 0\n" +
                    "0 0 0 0 0 1";
            assertEquals(-1, Main.setup(new InputStreamReader(new java.io.ByteArrayInputStream(input.getBytes()))));

            input = "6 4\n" +
                    "1 -1 0 0 0 0\n" +
                    "0 -1 0 0 0 0\n" +
                    "0 0 0 0 -1 0\n" +
                    "0 0 0 0 -1 1";
            assertEquals(6, Main.setup(new InputStreamReader(new java.io.ByteArrayInputStream(input.getBytes()))));

            input = "5 5\n" +
                    "-1 1 0 0 0\n" +
                    "0 -1 -1 -1 0\n" +
                    "0 -1 -1 -1 0\n" +
                    "0 -1 -1 -1 0\n" +
                    "0 0 0 0 0";
            assertEquals(14, Main.setup(new InputStreamReader(new java.io.ByteArrayInputStream(input.getBytes()))));

            input = "2 2\n" +
                    "1 -1\n" +
                    "-1 1";
            assertEquals(0, Main.setup(new InputStreamReader(new java.io.ByteArrayInputStream(input.getBytes()))));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
