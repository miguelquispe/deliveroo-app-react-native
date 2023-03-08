import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import { ScrollView, Text, View } from "react-native";
import {
  ArrowLeftIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import { useDispatch } from "react-redux";
import BasketIcon from "../components/BasketIcon";
import DishRow from "../components/DishRow";
import { setRestaurant } from "../features/restaurantSlice";
import { urlFor } from "../sanity";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
      id,
      image,
      name,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        image,
        name,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(image).url(),
            }}
            className="w-full h-56 bg-gray--300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{name}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color={"green"} opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> - {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color={"gray"} opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  Nearby - {address}
                </Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" size={20} opacity={0.5} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-4 pt-6 font-bold text-xl">Menú</Text>
          {/* Dishrows */}
          {dishes?.map((dish) => (
            <DishRow key={dish._id} {...dish} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
