#include "vector.h"
#include <iostream>
#include <vector>


class Foo {
public:
    Foo() {}

    Foo(std::vector<int>&& buffer)
        : buffer_(std::move(buffer))
    {
    }

    void Fill() {
        for (int i = 0; i < 10; i++) {
            buffer_.push_back(std::rand());
        }
    }

    std::vector<int>&& Move() {
        return std::move(buffer_);
    }

    void Print(const char* title) {
        std::cout << title << ": ";
        for (int i = 0; i < buffer_.size(); i++) {
            std::cout << buffer_[i] << " ";
        }
        std::cout << std::endl;
    }

private:
    std::vector<int> buffer_;
};

void vector_move_test()
{
    Foo foo1;
    foo1.Fill();
    foo1.Print("foo1");

    Foo foo2(foo1.Move());
    foo2.Print("foo2");

    foo1.Print("foo1");

    foo1.Fill();
    foo1.Print("foo1");
}