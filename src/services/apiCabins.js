import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  console.log(newCabin);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://zdmumewnoadrufptujzq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  //1. Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin.data, image: imagePath }]);
  // console.log([{ ...newCabin.data, image: imagePath }]);
  if (error) {
    throw new Error("Cabin could not be created");
  }

  //2.Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
