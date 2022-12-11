#include <iostream>


template<typename _T>
class FooBase {
public:
    virtual ~FooBase() {}

    void func()
    {
        std::cout << "FooBase::func()" << std::endl;
        //static_cast<_T*>(this)->callback();
        //reinterpret_cast<_T*>(this)->callback();
    }

private:
    int base_{ 0 };
};

class Foo : public FooBase<Foo>
{
public:
    virtual ~Foo() {}

    void callback()
    {
        std::cout << "Foo::callback()" << std::endl;
    }
    
private:
    int member_{ 1 };
};

namespace cpp11 {
    void type_cast()
    {
        Foo foo;

        foo.func();
    }
}