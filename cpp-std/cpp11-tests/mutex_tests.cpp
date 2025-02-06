#include "pch.h"
#include <iostream>
#include <map>
#include <thread>
#include <mutex>

namespace {

std::map<std::string, std::string> _g_pages;
std::mutex _g_pages_mutex;

void _save_page(const std::string& url)
{
	// simulate a long page fetch
	std::this_thread::sleep_for(std::chrono::seconds(2));
	std::string result = "fake content";

	// std::lock_guard<std::mutex> guard(g_pages_mutex);

	_g_pages_mutex.lock();
	_g_pages[url] = result;
	_g_pages_mutex.unlock();
}

} // namespace


TEST(MutexTests, LockTests) {
	std::thread t1(_save_page, "http://foo");
	std::thread t2(_save_page, "http://bar");

	t1.join();
	t2.join();

	// safe to access g_pages without lock now, as the threads are joined
	for (const auto& pair : _g_pages) {
		std::cout << pair.first << " => " << pair.second << '\n';
	}
}
