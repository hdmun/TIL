#include <Windows.h>
#include <iostream>
#include <thread>
#include <vector>

class SRWLock {
public:
    SRWLock(const SRWLock&) = delete;
    SRWLock& operator=(const SRWLock&) = delete;

    SRWLock() {
        InitializeSRWLock(&srwLock);
    }

    void lock() {
        AcquireSRWLockExclusive(&srwLock);
    }

    void unlock() {
        ReleaseSRWLockExclusive(&srwLock);
    }

private:
    SRWLOCK srwLock;
};

class SRWLockGuard {
public:
    SRWLockGuard() = delete;
    SRWLockGuard(const SRWLockGuard&) = delete;
    SRWLockGuard& operator=(const SRWLockGuard&) = delete;

    SRWLockGuard(SRWLock& lock)
        : srwLock(lock) {
        srwLock.lock();
    }

    virtual ~SRWLockGuard() {
        srwLock.unlock();
    }

private:
    SRWLock& srwLock;
};


SRWLock g_lock;
int g_number = 0;

void incNumber(int count)
{
    for (int i = 0; i < count; i++) {
        SRWLockGuard guard(g_lock);
        // SRWLockGuard guard2(g_lock);  //  dead lock
        g_number++;
    }
}

void decNumber(int count)
{
    for (int i = 0; i < count; i++) {
        SRWLockGuard guard(g_lock);
        g_number--;
    }
}



int main()
{
    std::vector<std::thread> threads;

    threads.push_back(std::thread(incNumber, 1000000));
    threads.push_back(std::thread(incNumber, 1000000));
    threads.push_back(std::thread(incNumber, 1000000));
    threads.push_back(std::thread(incNumber, 1000000));

    threads.push_back(std::thread(decNumber, 1000000));
    threads.push_back(std::thread(decNumber, 1000000));
    threads.push_back(std::thread(decNumber, 1000000));
    threads.push_back(std::thread(decNumber, 1000000));

    for (auto& t : threads) {
        t.join();
    }

    std::cout << "g_number: " << g_number << std::endl;
    return 0;
}
