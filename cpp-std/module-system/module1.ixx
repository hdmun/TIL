export module module1;

import std.core;
import module2;

export namespace module1
{
    void MyFunc()
    {
        std::cout << "module1::MyFunc()" << std::endl;
        Add();
        Foo foo;
        foo.Inc();
        foo.Dec();
    }
}