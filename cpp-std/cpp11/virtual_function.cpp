#include <iostream>

class FooBase;

class Foo1 {
public:
    Foo1(FooBase* foo_base)
        : p(foo_base)
    {
    }

    void func();

private:
    FooBase* p;
};

class FooBase {
public:
    FooBase()
        : foo1(this)
    {
    }

    void func()
    {
        foo1.func();
    }

    virtual void callback()
    {
        std::cout << "FooBase::callback()" << std::endl;
    }

private:
    Foo1 foo1;
    int base_{ 0 };
};


void Foo1::func()
{
    std::cout << "Foo1::func()" << std::endl;
    p->callback();
}

class Foo : public FooBase
{
public:
    Foo() : FooBase() {}
    virtual ~Foo() {}

    virtual void callback()
    {
        std::cout << "Foo::callback()" << std::endl;
    }

private:
    int member_{ 1 };
};

namespace cpp11 {

    void virtual_function()
    {
        FooBase* p = new Foo;
        p->func();
    }
}