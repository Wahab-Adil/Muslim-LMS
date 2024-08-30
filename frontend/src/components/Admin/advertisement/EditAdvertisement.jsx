import { useEffect, useState, useRef } from "react";

import { Link, useParams } from "react-router-dom";

import Loader from "../../../components/loader/Loader";

import {
  getSingleAdvertisement,
  updateAdvertisement,
  getAdvertisement,
  selectIsLoading,
} from "../../../store/features/advertisement/advertisementSlice";

// redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// store
import EditAdvertisementForm from "./EditAdvertisementForm";
// store

export default function AddAdvertisement() {
  // redux
  const advertisementId = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleAdvertisement(advertisementId?.id));
  }, []);

  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const Advertisment = useSelector(getAdvertisement);

  // state

  return (
    <>
      {isLoading && <Loader />}

      {Advertisment && (
        <EditAdvertisementForm
          key={Advertisment}
          Advertisment={Advertisment}
          updateAdvertisement={updateAdvertisement}
        />
      )}
    </>
  );
}
