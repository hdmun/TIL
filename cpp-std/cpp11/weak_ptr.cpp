#include <iostream>
#include <memory>

namespace weak_ptr_ {
	int g_sn{ 0 };

	class Foo {
	private:
		int sn{ ++g_sn };
	};
}

namespace cpp11 {
    void weak_ptr_()
    {
        std::shared_ptr<weak_ptr_::Foo> foo = std::make_shared<weak_ptr_::Foo>();

        std::weak_ptr<weak_ptr_::Foo> foo_weak = foo;

        foo = nullptr;

        std::shared_ptr<weak_ptr_::Foo> foo_lock = foo_weak.lock();
        if (foo_lock != nullptr) {
            std::cout << "get foo from weak_ptr<Foo>" << std::endl;
        }
    }
}