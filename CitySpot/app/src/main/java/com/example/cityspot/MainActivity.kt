package com.example.cityspot

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Face
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.cityspot.ui.theme.CitySpotTheme
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import com.google.maps.android.compose.GoogleMap
import com.google.maps.android.compose.Marker
import com.google.maps.android.compose.MarkerState
import com.google.maps.android.compose.rememberCameraPositionState

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CitySpotTheme { Main() }
        }
    }
}

@Composable
fun Main() {
    val navController = rememberNavController()
    Column(Modifier.padding(8.dp)) {
        NavHost(
            navController, startDestination = NavRoutes.Home.route, modifier = Modifier.weight(1f)
        ) {
            composable(NavRoutes.Home.route) { Home() }
            composable(NavRoutes.MapView.route) { MapView() }
        }
        BottomNavigationBar(navController = navController)
    }
}

@Composable
fun BottomNavigationBar(navController: NavController) {
    NavigationBar {
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
            title = "Главная", image = Icons.Filled.LocationOn, route = "home"
        ),
        BarItem(
            title = "Карта", image = Icons.Filled.Face, route = "mapView"
        ),
    )
}

data class BarItem(
    val title: String, val image: ImageVector, val route: String
)

@Composable
fun Home() {
    Text("Главная", fontSize = 30.sp)
}

@Composable
fun MapView() {
    var currentLocation by remember { mutableStateOf<LatLng?>(null) }
    RequestLocationPermission()

    GetCurrentLocation { location ->
        currentLocation = location
    }
    Log.d("LOCATION", currentLocation.toString())
    val cameraPositionState = rememberCameraPositionState {
        if (currentLocation != null) {
            position = CameraPosition.fromLatLngZoom(currentLocation!!, 10f)
        }
    }
    Text("MapView Page", fontSize = 30.sp)
    GoogleMap(
        modifier = Modifier.fillMaxSize(),
        cameraPositionState = cameraPositionState
    ) {
        currentLocation?.let {
            Marker(
                state = MarkerState(position = it),
                title = "Ваше местоположение",
                snippet = "Вы здесь"
            )
        }
//        Button(modifier = Modifier
//            .height(50.dp)
//            .width(50.dp), onClick = {
//            currentLocation?.let { location ->
//                cameraPositionState.move(CameraUpdateFactory.newLatLngZoom(location, 15f))
//            }
//        }) {
//            Text("Перейти к моему местоположению")
//        }
    }

}

@Composable
fun About() {
    Text("About Page", fontSize = 30.sp)
}

sealed class NavRoutes(val route: String) {
    data object Home : NavRoutes("home")
    data object MapView : NavRoutes("mapView")
    data object About : NavRoutes("about")
}


