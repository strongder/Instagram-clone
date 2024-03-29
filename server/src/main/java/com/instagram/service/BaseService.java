package com.instagram.service;

import java.util.List;

public interface BaseService<T, K> {
	T getById(K key);
    List<T> getAll();
    T create(T type);
    T update(T type);

}
