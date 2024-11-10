package com.example.cityspot

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.navigation.NavController
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.cityspot.ui.theme.CitySpotTheme
import com.yandex.mapkit.MapKitFactory
import com.yandex.mapkit.geometry.Point
import com.yandex.mapkit.map.MapObjectCollection
import com.yandex.mapkit.map.PlacemarkMapObject
import com.yandex.mapkit.mapview.MapView
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        MapKitFactory.setApiKey("2f985c45-c8b6-4935-a4c5-61b19a08d77a")
        MapKitFactory.initialize(this)
        setContent {
            CitySpotTheme { Main() }
        }
    }
}

@Composable
fun Main() {
    val navController = rememberNavController()
    RequestLocationPermission()
    Column(
        Modifier
            .padding(8.dp)
            .fillMaxWidth()
    ) {
        NavHost(
            navController, startDestination = NavRoutes.Home.route, modifier = Modifier.weight(1f)
        ) {
            composable(NavRoutes.Home.route) { Home() }
            composable(NavRoutes.AddressScreen.route) { AddressScreen() }
            composable(NavRoutes.MapScreen.route) { MapScreen() }
        }
        BottomNavigationBar(navController = navController)
    }
}

@Composable
fun BottomNavigationBar(navController: NavController) {
    NavigationBar(modifier = Modifier.fillMaxWidth()) {
        val backStackEntry by navController.currentBackStackEntryAsState()
        val currentRoute = backStackEntry?.destination?.route

        NavBarItems.BarItems.forEach { navItem ->
            NavigationBarItem(selected = currentRoute == navItem.route, onClick = {
                navController.navigate(navItem.route) {
                    popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                    launchSingleTop = true
                    restoreState = true
                }
            }, icon = {
                Icon(
                    imageVector = navItem.image, contentDescription = navItem.title
                )
            }, label = {
                Text(text = navItem.title)
            })
        }
    }
}

object NavBarItems {
    val BarItems = listOf(
        BarItem(
            title = "Главная", image = Icons.Filled.Home, route = "home"
        ), BarItem(
            title = "Адрес", image = Icons.Filled.Search, route = "address"
        ), BarItem(
            title = "Карта", image = Icons.Filled.LocationOn, route = "map"
        )
    )
}

data class BarItem(
    val title: String, val image: ImageVector, val route: String
)

@Composable
fun Home() {
    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Center) {
        Text("Главная", fontSize = 30.sp)
    }
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            "\tВ данном приложении вы можете получить информацию о заинтересовавшем вас здании\n\nНайдите здание удобным для вас образом",
            fontSize = 20.sp
        )
    }
}

@Composable
fun AddressScreen() {
    var text by remember { mutableStateOf("") }
    var ll by remember { mutableStateOf("") }
    val coroutineScope = rememberCoroutineScope()

    GetCurrentLocation { point ->
        ll = point.longitude.toString() + "," + point.latitude.toString()
    }

    Text("Поиск по адресу", fontSize = 30.sp)
    Column(
        horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center
    ) {
        TextField(
            value = text,
            onValueChange = {
                text = it
            },
            label = { Text("Введите адрес") },
            modifier = Modifier.fillMaxWidth(),
        )
        Button(onClick = {
            coroutineScope.launch {
                try {
                    val response = RetrofitInstance.yandex.getCoords(API_KEY, text, "json")
                    Log.d("GEOCODE", response.response.featureMember[0].geoObject.name)
                } catch (e: Exception) {
                    e.message?.let { Log.d("GEOCODE", it) }
                }
            }
        }) { Text("Найти") }
    }

}

@Composable
fun MapScreen() {
    YandexMap()
}

@Composable
fun YandexMap() {
    AndroidView(factory = { context ->
        MapView(context).apply {
            map.move(
                com.yandex.mapkit.map.CameraPosition(
                    Point(55.7558, 37.6173), 10f, 0f, 0f
                ) // Координаты Москвы
            )
            val mapObjects: MapObjectCollection = map.mapObjects.addCollection()
            val placemark: PlacemarkMapObject = mapObjects.addPlacemark(Point(55.7558, 37.6173))
            //placemark.setIcon(BitmapFactory.decodeResource(resources, R.drawable.marker_icon)) // Замените на свой ресурс иконки
        }
    })
}


sealed class NavRoutes(val route: String) {
    data object Home : NavRoutes("home")
    data object AddressScreen : NavRoutes("address")
    data object MapScreen : NavRoutes("map")
}


