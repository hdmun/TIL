#include <iostream>
#include <memory>

namespace cpp11 {
    int g_sn{ 0 };

    class Foo {
    private:
        int sn{ ++g_sn };
    };

    void weak_ptr_()
    {
        std::shared_ptr<Foo> foo = std::make_shared<Foo>();

        std::weak_ptr<Foo> foo_weak = foo;

        foo = nullptr;

        std::shared_ptr<Foo> foo_lock = foo_weak.lock();
        if (foo_lock != nullptr) {
            std::cout << "get foo from weak_ptr<Foo>" << std::endl;
        }
    }
}