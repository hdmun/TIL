module module2;

import std.core;

namespace module1
{
    Foo::Foo()
    {
        std::cout << "Foo::Foo()" << std::endl;
    }

    void Foo::Inc()
    {
        std::cout << "Foo::Inc()" << std::endl;
    }

    void Foo::Dec()
    {
        std::cout << "Foo::Inc()" << std::endl;
    }

    void Add()
    {
        std::cout << "module2::Add()" << std::endl;
    }
}