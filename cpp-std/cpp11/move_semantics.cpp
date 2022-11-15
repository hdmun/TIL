#include <iostream>
#include <utility>
#include <vector>

// https://github.com/AnthonyCalandra/modern-cpp-features/blob/master/CPP11.md#move-semantics
namespace cpp11 {
    int x = 0; // `x` is an lvalue of type `int`
    int& xl = x; // `xl` is an lvalue of type `int&`
    // int&& xr = x; // compiler error -- `x` is an lvalue
    int&& xr2 = 0; // `xr2` is an lvalue of type `int&&` -- binds to the rvalue temporary, `0`

    void f(int& x)
    {
        std::cout << "f(int&) : " << x << std::endl;
    }

    void f(int&& x)
    {
        std::cout << "f(int&&) : " << x << std::endl;
    }

    class Foo {
    public:
        Foo(Foo&& foo) noexcept
            : queue(std::move(foo.queue))
        {
        }
        virtual ~Foo() {}

        void push(int x)
        {
            queue.push_back(x);
        }

        int pop()
        {
            int pop = queue.back();
            queue.pop_back();
            return pop;
        }

    private:
        std::vector<int> queue;
    };

    void move_semantics()
    {
        std::cout << "call `move_semantics`\n";

        f(x);  // calls f(int&)
        f(xl); // calls f(int&)
        f(3);  // calls f(int&&)
        f(std::move(x)); // calls f(int&&)
        f(std::move(xl)); // calls f(int&&)

        f(x);  // calls f(int&)
        f(xl); // calls f(int&)

        f(xr2);            // calls f(int&)
        f(std::move(xr2)); // calls f(int&& x)
    }
}