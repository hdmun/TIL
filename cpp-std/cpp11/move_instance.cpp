#include <iostream>
#include <utility>
#include <vector>
#include <random>

namespace cpp11 {

    class FooVector {
    public:
        FooVector()
        {
            for (int i = 0; i < 5; i++) {
                data_.push_back(std::rand());
            }

            std::cout << "FooVector(), " << data_.size() << std::endl;
        }

        FooVector(FooVector&& rhs) noexcept
            : data_(std::move(rhs.data_))
        {
            std::cout << "FooVector(const FooVector&& rhs), " << data_.size() << std::endl;
        }

        virtual ~FooVector()
        {
            std::cout << "~FooVector()" << std::endl;
        }

        FooVector& operator= (FooVector&& rhs) noexcept
        {
            this->data_ = std::move(rhs.data_);
            std::cout << "FooVector&& operator= (const FooVector&& rhs): " << data_.size() << std::endl;
            return *this;
        }

        void Print()
        {
            for (auto data : data_) {
                std::cout << data << ", ";
            }
            std::cout << std::endl;
        }

        static FooVector Create()
        {
            std::cout << "static FooVector Create()" << std::endl;
            return FooVector();
        }

    private:
        std::vector<int> data_;
    };


    void move_instance()
    {
        FooVector foo1;
        foo1.Print();

        FooVector foo2(std::move(foo1));
        foo2.Print();

        FooVector foo3(std::move(FooVector::Create()));
        foo3.Print();
    }
}