#include <iostream>
#include <exception>

// https://en.cppreference.com/w/cpp/error/current_exception

namespace cpp11
{
    void handle_eptr(std::exception_ptr eptr) // passing by value is ok
    {
        try {
            if (eptr) {
                std::rethrow_exception(eptr);
            }
        }
        catch (const std::exception& e) {
            std::cout << "Caught exception \"" << e.what() << "\"\n";
        }
    }

    class CustomExceptionInherit
        : public std::exception
    {
    public:
        CustomExceptionInherit(const char* message) noexcept
            : std::exception(message, 0) {}
    };

    class CustomException
    {
    public:
        CustomException(const char* message) noexcept
            : _What(message) {}

        char const* what() const {
            return _What;
        }

    private:
        char const* _What;
        bool        _DoFree;
    };

    void throw_CustomException()
    {
        throw CustomException("CustomException!!");
    }

    void exception_catch()
    {
        try
        {
            throw CustomExceptionInherit("CustomExceptionInherit!!");
            throw_CustomException();
        }
        catch (...)
        {
            std::exception_ptr eptr = std::current_exception();
            std::cout << "catch" << std::endl;
        }
    }
}