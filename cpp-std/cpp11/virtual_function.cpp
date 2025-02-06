#include <iostream>

namespace virtual_function {
	class FooBase;

	class Caller {
	public:
		Caller(FooBase* foo_base)
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
			: caller_(this)
		{
		}

		void func()
		{
			caller_.func();
		}

		virtual void callback()
		{
			std::cout << __FILE__ << "FooBase::callback()" << std::endl;
		}

	private:
		Caller caller_;
		int base_{ 0 };
	};


	void Caller::func()
	{
		std::cout << __FILE__ << "Caller::func()" << std::endl;
		p->callback();
	}

	class Foo1 : public FooBase
	{
	public:
		Foo1()
			: FooBase()
		{
		}
		virtual ~Foo1()
		{
		}

		virtual void callback() override
		{
			std::cout << __FILE__ << "Foo1::callback()" << std::endl;
		}

	private:
		int member_{ 1 };
	};

	class Foo2 : public FooBase
	{
	public:
		Foo2()
			: FooBase()
		{
		}
		virtual ~Foo2()
		{
		}

		virtual void callback() override
		{
			std::cout << __FILE__ << "Foo2::callback()" << std::endl;
		}

	private:
		float member_{ 1.f };
	};


	class FooMultiInherit : public Foo2, public Foo1
	{
	public:
		FooMultiInherit()
			: Foo1()
			, Foo2()
		{
		}
		virtual ~FooMultiInherit()
		{
		}

	private:
		short member_{ -1 };
	};
}

namespace cpp11 {

    void virtual_function()
    {
		virtual_function::FooBase* foo1 = new virtual_function::Foo1;
        foo1->func();

		virtual_function::FooBase* foo2 = new virtual_function::Foo2;
		foo2->func();
		
		auto multiInherit = new virtual_function::FooMultiInherit;
		// multiInherit->func(); // C2385
		multiInherit->Foo2::func();
		multiInherit->Foo1::func();

		//multiInherit->callback(); // C2385
		multiInherit->Foo2::callback();
		multiInherit->Foo1::callback();
    }
}