export async function POST(request: Request) {
  try {
    // 1. Receive the image from the frontend
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return Response.json(
        { message: "Please provide an image." },
        { status: 400 }
      );
    }

    // 2. Get the private API key
    const apiKey = process.env.IMGBB_API_KEY;

    if (!apiKey) {
      return Response.json(
        { message: "ImgBB API key is missing." },
        { status: 500 }
      );
    }

    // 3. Prepare the image for ImgBB
    const imgbbFormData = new FormData();
    imgbbFormData.append("image", image);

    // 4. Send the image to ImgBB
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: imgbbFormData,
      }
    );

    const result = await response.json();


    if (!response.ok || !result.success) {
      return Response.json(
        { message: result.error?.message || "Image upload failed." },
        { status: 502 }
      );
    }

    // 5. Return the hosted image URL
    return Response.json({
      message: "Image uploaded successfully!",
      imageUrl: result.data.url,
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return Response.json(
      { message: "Something went wrong during image upload." },
      { status: 500 }
    );
  }
}