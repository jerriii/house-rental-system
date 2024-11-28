import { FaCheckCircle, FaClock, FaExclamationTriangle, FaMoneyCheckAlt, FaTimesCircle } from "react-icons/fa";
import { FaBan, FaRegHourglass } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { FaHome, FaCalendarAlt, FaHammer, FaHourglassHalf, FaHandHolding, FaRegTimesCircle, FaLock } from "react-icons/fa";

export const rentalStatusConfig: Record<string, { color: string; icon: IconType }> = {
    Pending: { color: "yellow.400", icon: FaRegHourglass },
    Paid: { color: "teal.500", icon: FaCheckCircle },
    Overdue: { color: "orange.500", icon: FaExclamationTriangle },
    PartiallyPaid: { color: "blue.500", icon: FaMoneyCheckAlt },
    Expired: { color: "red.500", icon: FaBan },
  };

export const propertystatusConfig: Record<string, { color: string; icon: IconType }> = {
  Vacant: { color: "green.500", icon: FaHome },
  Booked: { color: "blue.500", icon: FaCalendarAlt },
  Occupied: { color: "red.500", icon: FaRegTimesCircle },
  "Under Maintenance": { color: "orange.500", icon: FaHammer },
  "Pending Approval": { color: "yellow.400", icon: FaHourglassHalf },
  "Under Negotiation": { color: "purple.500", icon: FaHandHolding },
  Inactive: { color: "gray.500", icon: FaLock }
};

export const propertyavailableConfig: Record<string, { color: string; icon: IconType }> = {
  Available: { color: "green.500", icon: FaHome },
  Unavailable: { color: "red.500", icon: FaRegTimesCircle },
};

export const bookingStatusConfig: Record<string, { color: string; icon: IconType }> = {
  Pending: { color: "yellow.500", icon: FaClock },
  Confirmed: { color: "green.500", icon: FaCheckCircle },
  Cancelled: { color: "red.500", icon: FaTimesCircle },
};


  export const properties = [
    {
      "id": 1,
      "name": "Villa Enny Cho - Japanese Home",
      "image": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "status": "Vacant",
      "details": {
        "size": "1200 sqft",
        "bedrooms": 3,
        "bathrooms": 2,
        "address": "123 Sakura Street, Kyoto, Japan"
      }
    },
    {
      "id": 2,
      "name": "Green Park Apartment",
      "image": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "status": "Booked",
      "details": {
        "size": "800 sqft",
        "bedrooms": 2,
        "bathrooms": 1,
        "address": "456 Green Ave, New York, USA"
      }
    },
    {
      "id": 3,
      "name": "Sunny Beach House",
      "image": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "status": "Occupied",
      "details": {
        "size": "1500 sqft",
        "bedrooms": 4,
        "bathrooms": 3,
        "address": "789 Ocean Blvd, Malibu, USA"
      }
    },
    {
      "id": 4,
      "name": "Mountain View Villa",
      "image": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "status": "Under Maintenance",
      "details": {
        "size": "2000 sqft",
        "bedrooms": 5,
        "bathrooms": 4,
        "address": "234 Mountain Rd, Aspen, USA"
      }
    },
    {
      "id": 5,
      "name": "Lakefront Property",
      "image": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "status": "Pending Approval",
      "details": {
        "size": "1400 sqft",
        "bedrooms": 3,
        "bathrooms": 2,
        "address": "345 Lakeview Drive, Tahoe, USA"
      }
    },
    {
      "id": 6,
      "name": "Downtown Studio",
      "image": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "status": "Under Negotiation",
      "details": {
        "size": "500 sqft",
        "bedrooms": 1,
        "bathrooms": 1,
        "address": "567 City Center, San Francisco, USA"
      }
    },
    {
      "id": 7,
      "name": "Countryside Cottage",
      "image": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "status": "Inactive",
      "details": {
        "size": "1000 sqft",
        "bedrooms": 3,
        "bathrooms": 2,
        "address": "890 Country Lane, Vermont, USA"
      }
    }
  ]