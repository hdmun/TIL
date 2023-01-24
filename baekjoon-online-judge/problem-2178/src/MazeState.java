public enum MazeState {
    Wall('0'),
    Path('1');

    private final char state;

    MazeState(char state) {
        this.state = state;
    }

    public static MazeState from(char value) {
        switch (value) {
            case '0': return Wall;
            case '1': return Path;
            default:
                throw new IllegalArgumentException("invalid MazeState value`" + value + "`");
        }
    }
}
