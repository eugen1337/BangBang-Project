package com.example.cityspot

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Query


object RetrofitInstance {
    private const val BASE_URL = "https://geocode-maps.yandex.ru/1.x/"

    val yandex: YandexApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(YandexApiService::class.java)
    }
}

data class GeocodeResponse(val response: GeoObjectCollection)

data class GeoObjectCollection(val featureMember: List<Member>)

data class Member(val geoObject: GeoObject)

data class GeoObject(val name: String, val description: String, val boundedBy: BoundedBy)

data class BoundedBy(val envelope: Bounds)
data class Bounds(val lowerCorner: String, val upperCorner: String)

interface YandexApiService {
    @GET("https://geocode-maps.yandex.ru/1.x/")
    suspend fun getCoords(
        @Query("apikey") apiKey: String,
        @Query("geocode") geocode: String,
        @Query("format") format: String,
    ): GeocodeResponse
}

interface BackendApiService {
    @GET("v1/suggest")
    suspend fun getCoords(
        @Query("apikey") apiKey: String,
        @Query("geocode") geocode: String,
        @Query("format") format: String,
    ): GeocodeResponse
}