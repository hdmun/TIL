# Item 2. 생성자에 매개변수가 많다면 빌더를 고려하라

생성자에 선택적인 매개변수가 많을 때 적절히 대응하기 위해선 빌더 패턴을 사용하자.

## 점층적 생선자 패턴

```java
// 생성자 매개변수 예시 코드 작성
public class Mob {
    private final int id;
    private final int maxHp;
    private final boolean boss;
    private final boolean flying;
    private int hp;

    public Mob(int id, int maxHp) {
        this(id, max, false, false);
    }

    public Mob(int id, int maxHp, boolean boss) {
        this(id, max, boss, false);
    }

    public Mob(int id, int maxHp, boolean boss, boolean flying) {
        this.id = id;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.boss = boss;
        this.flying = flying;
    }
}
```

점층적 생선자 패턴도 쓸 수 있지만, 매개변수 개수가 많아지면 코드를 작성하거나 읽기 어렵다.

각 값의 의미가 어떤건지 헷갈릴 유지보수가 힘들다. 

## JavaBeans Pattern

매개변수가 없는 생성자로 객체를 만든 후, setter 메서드를 호출해 원하는 매개변수의 값을 설정하는 방식

```java
public class Mob {
    private int id = -1;
    private int maxHp = -1;
    private boolean boss = false;
    private boolean flying = false;
    private int hp = -1;

    public Mob() {}

    public void setId(int val) { this.id = val; }
    public void setMaxHp(int val) { this.maxHp = val; }
    public void setBoss(boolean val) { this.boss = val; }
    public void setFlying(boolean val) { this.flying = val; }
    public void setHp(int val) { this.hp = val; }
}
```

```java
Mob flyingBossMob = new Mob();
normalMob.setId(1);
normalMob.setMaxHp(500000);
normalMob.setHp(500000);
normalMob.setBoss(true);
normalMob.setFlying(true);
```

객체 하나를 만들려면 메서드를 여러 개 호출해야 한다.

객체가 완전히 생성되기 전까지는 일관성(consistency)이 무너진 상태에 놓이게 된다.

클래스를 `immutable`로 만들 수 없다.


## 빌더 패턴

점층적 생성자 패턴의 안전성 자바 빈즈 패턴의 가독성을 가진다.

1. 필수 매개변수로만 생성자를 호출해 빌더 객체 생성
2. 빌더 객체가 제공하는 세터 메서드들로 원하는 선택 매개변수들을 설정
3. 매개변수가 없는 `bulid` 메서드를 호출해 필요한 객체를 얻는다

```java


public class Mob {
    private final int id;
    private final int maxHp;
    private final boolean boss;
    private final boolean flying;
    private int hp;

    public static class Builder {
        private final int id;
        private final int maxHp;
        private boolean boss = false;
        private boolean flying = false;

        public Builder(int id, int maxHp) {
            this.id = id;
            this.maxHp = maxHp;
        }

        public Builder boss(int val) { boss = val; return this; }
        public Builder flying(int val) { flying = val; return this; }

        public Mob build() {
            return new Mob(this);
        }
    }

    private Mob(Builder builder) {
        this.id = builder.id;
        this.maxHp = builder.maxHp;
        this.boss = builder.boss;
        this.flying = builder.flying;
        this.hp = builder.maxHp;
    }
}
```

```java
Mob normalMob = Mob.Builder(1, 2000)
                    .build();

Mob bossMob = Mob.Builder(1, 100000)
                .boss(true)
                .build();

Mob flyingMob = Mob.Builder(1, 2000)
                    .flying(true)
                    .build();

Mob flyingBossMob = Mob.Builder(1, 200000)
                        .boss(true)
                        .flying(true)
                        .build();
```

fluent API or method chaning

python, scala에 있는 `named optional parameters`를 흉내 낸 것

유효성 검사는 빌더 메서드에서 검사를 하면 된다.

**빌더 패턴은 계층적으로 설계된 클래스와 함께 쓰기에 좋다.**

```java
public abstract class GameObject {
    protected final int id;
    protected final int templateId;
    protected int fieldId;
    protected int x;
    protected int y;

    abstract static class Builder<T extends Builder<T>> {
        private static int objectId = 0;
        private final int id;
        private final int templateId;
        private int fieldId;
        private int x = -1;
        private int y = -1;

        public Builder(int templateId) {
            this.id = ++objectId;
            this.templateId = templateId;
        }

        public T field(int fieldId) {
            this.fieldId = fieldId;
        }

        public T position(int x, int y) {
            this.x = x;
            this.y = y;
            return self();
        }

        abstract GameObject build();
        protected abstract T self();
    }

    GameObject(Builder<?> builder) {
        id = builder.id;
        x = builder.x;
        y = builder.y;
    }
}
```

```java
public class Mob extends GameObject {
    public enum Type {
        Normal, Summon, Boss
    }

    private final Type type;
    private int respawnX;
    private int respawnY;

    public static class Builder extends GameObject.Builder<Builder> {
        private final Type type;
        private int respawnX;
        private int respawnY;

        public Builder(int templateId, Type type) {
            super(templateId);
            this.type = type;
        }

        public respawn(int x, int y) {
            this.respawnX = x;
            this.respawnY = y;
            position(x, y);
        }

        @Override
        GameObject build() { return new Mob(this); }

        @Override
        protected Builder self() { return this; }
    }

    public Mob(Builder builder) {
        super(builder);
        this.type = builder.type;
        this.respawnX = builder.respawnX;
        this.respawnY = builder.respawnY;
    }
} 
```

```java
public class Npc extends GameObject {
    public enum Type {
        Normal, Shop, Portal
    }

    private final Type type;

    public static class Builder extends GameObject.Builder<Builder> {
        public Builder(int templateId, Type type) {
            super(templateId);
            this.type = type;
        }

        @Override
        GameObject build() { return new Npc(this); }

        @Override
        protected Builder self() { return this; }
    }

    public Npc(Builder builder) {
        super(builder);
        this.type = builder.type;
    }
}
```

```java
Mob normalMob = new Mob.Builder(810000, Mob.Type.Normal)
                    .field(5500000)
                    .respawn(100, 150)
                    .build();

Mob bossMob = new Mob.Builder(810000, Mob.Type.Boss)
                    .field(5500000)
                    .respawn(100, 150)
                    .build();

Npc npc = new Npc.Builder(25000, Npc.Type.Shop)
                    .field(2000000)
                    .poistion(5000, 300)
                    .build();
```

객체 생성시 빌더 생성 비용이 추가되므로 성능이 민감한 상황에서는 문제 소지가 될 수 있다.

생성자 매개변수가 4개 이상은 되어야 값어치를 한다.



> 생성자나 정적 팩터리가 처리해야 할 매개변수가 많다면 빌더 패턴을 선택하는게 더 낫다.