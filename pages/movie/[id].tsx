import { Banner, BookModal, Details, TimeslotList } from "@/components";
import { generateFakeTimeSlots, generateMovieData } from "@/utils/fakeData";
import { FeaturedStruct, MovieStruct, TimeSlotStruct } from "@/utils/type.dt";
import { GetServerSidePropsContext, NextPage } from "next";

interface PageProps {
  movieData: MovieStruct;
  slotsData: TimeSlotStruct[];
}

const Page: NextPage<PageProps> = ({ movieData, slotsData }) => {
  const movie = movieData,
    timeslots = slotsData;

  return movie ? (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <Banner movie={movie as FeaturedStruct} ticket />
      <Details movie={movie} />
      {timeslots.length > 0 && <TimeslotList slots={timeslots} />}
      <BookModal timeSlots={timeslots} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;
  const movieData: MovieStruct = generateMovieData(1)[0];
  const slotsData: TimeSlotStruct[] = generateFakeTimeSlots(Number(id));

  return {
    props: {
      movieData: JSON.parse(JSON.stringify(movieData)),
      slotsData: JSON.parse(JSON.stringify(slotsData)),
    },
  };
};
