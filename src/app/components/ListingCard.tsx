import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../Lib/getCountries";
import {
  AddToFavouriteButton,
  DeleteFromFavouriteButton,
} from "./SubmitButtons";
import { addToFavourite, DeleteFromFavourite } from "../action";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavouriteList: boolean;
  favouriteId: string;
  homeId: string;
  pathName: string;
}

export function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  favouriteId,
  isInFavouriteList,
  homeId,
  pathName,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://zstjczvhwvtloekoekqp.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of House"
          fill
          className="rounded-lg h-full object-cover"
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavouriteList ? (
              <form action={DeleteFromFavourite}>
                <input type="hidden" name="favouriteId" value={favouriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavouriteButton />
              </form>
            ) : (
              <form action={addToFavourite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavouriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> Night
        </p>
      </Link>
    </div>
  );
}
