import { useContext, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TripContext } from "../../../context/TripContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { truncateString } from "../../../helpers/string_helpers";
import ClearTripsButton from "../../debug/ClearTripsButton";
import TripCount from "./TripCount";

const debug = false
const currentYear = new Date().getFullYear();

type PropTypes = {
  toggleAddTripForm: () => void;
};

const AppHeader: React.FC<PropTypes> = ({ toggleAddTripForm }): JSX.Element => {
  const {
    state: { trips },
  } = useContext(TripContext);

  const totalMiles = useMemo(() => {
    if (!trips.length) return 0.0;

    return trips.reduce((acc, trip) => {
      return acc + trip.miles;
    }, 0);
  }, [trips]);

  return (
    <View
      style={{ height: "40%"}}
      className={
        "relative shadow bg-white w-full border-b border-gray-400 flex flex-col justify-center items-center"
      }
    >
      <View className={""}>
        <Text
          style={{ letterSpacing: -2.3 }}
          className="text-center text-5xl font-bold text-primary"
        >
          {truncateString(totalMiles.toFixed(2).toLocaleString(), 10)}
        </Text>
        <Text
          style={{ letterSpacing: -0.5 }}
          className="text-center text-xl font-semibold text-gray-900 mb-2 "
        >
          Miles captured in {currentYear}
        </Text>
      </View>

      <View
        className={"flex flex-row justify-center items-center mb-4"}
      >

        <TripCount frequency={"ytd"}/>
        <TripCount frequency={"mtd"}/>
      </View>

      <View className="w-full px-8 flex flex-row justify-center items-center">
        {debug ? (<ClearTripsButton />) : null}
        <TouchableOpacity
          onPress={toggleAddTripForm}
          className={
            "py-3 px-8 flex flex-row justify-center items-center rounded-full bg-primary"
          }
        >
          <FontAwesome5 name="plus" size={24} color="white" />
          <Text className="text-xl font-bold text-white pl-4">Add Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;