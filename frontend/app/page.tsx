'use client';
import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Spinner,
  Image,
  Card,
  CardHeader,
} from '@nextui-org/react';
import { title } from '@/components/primitives';
import axios from 'axios';

export default function Home() {
  const [carCount, setCarCount] = useState<number | null>(null);
  const [truckCount, setTruckCount] = useState<number | null>(null);
  const [busCount, setBusCount] = useState<number | null>(null);
  const [motorcycleCount, setMotorcycleCount] = useState<number | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false); // Add loading state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalPlacement] = React.useState('auto');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedImage) {
      return;
    }

    setLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append('image', selectedImage);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/detect',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      } else {
        setCarCount(data.vehicle_counts.car);
        setTruckCount(data.vehicle_counts.truck);
        setBusCount(data.vehicle_counts.bus);
        setMotorcycleCount(data.vehicle_counts.motorcycle);
        setProcessedImage(data.image_path);
      }
    } catch (error) {
      console.error('Error:', error);
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Vehicle&nbsp;</h1>
        <h1 className={title({ color: 'violet' })}>
          Detection & Counter&nbsp;
        </h1>
        <br />
      </div>

      <div className="flex flex-col items-center justify-center gap-8 px-4 py-8">
        <h1 className="font-bold text-3xl mb-8">
          Upload Image for Vehicle Detection
        </h1>
        <div className="gap-8">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="file"
              name="image"
              accept="image/*"
              className="gap-4 mr-8"
              onChange={handleImageChange}
            />
            <Button
              onPress={onOpen}
              type="submit"
              color="primary"
              variant="shadow"
            >
              Detect Vehicles
            </Button>
          </form>
        </div>
        <Modal isOpen={isOpen} placement="auto" onClose={onClose} size="2xl">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Image Details
            </ModalHeader>
            <ModalBody>
              {selectedImage ? (
                isLoading ? (
                  <Spinner
                    label="Processing"
                    color="primary"
                    labelColor="primary"
                    size="lg"
                  />
                ) : (
                  <>
                    {carCount !== null && (
                      <div style={{ marginTop: '20px' }}>
                        <div className="flex gap-4 my-4">
                          <Card radius="lg" className="border-none px-4 py-4">
                            <CardHeader className="mb-4 flex-col items-center">
                              <p>Original Image:</p>
                            </CardHeader>

                            <Image
                              isBlurred
                              isZoomed
                              src={URL.createObjectURL(selectedImage)}
                              alt="Original"
                              width={300}
                            />
                          </Card>
                          <Card radius="lg" className="border-none px-4 py-4">
                            <CardHeader className="mb-4 flex-col items-center">
                              <p>Processed Image:</p>
                            </CardHeader>
                            <Image
                              isBlurred
                              isZoomed
                              src={URL.createObjectURL(selectedImage)}
                              alt="Processed"
                              width={300}
                            />
                          </Card>
                        </div>
                        <Card radius="lg" className="border-none px-4 py-4">
                          <h2>Vehicle Counts:</h2>
                          <p>Car Count: {carCount}</p>
                          <p>Truck Count: {truckCount}</p>
                          <p>Bus Count: {busCount}</p>
                          <p>Motorcycle Count: {motorcycleCount}</p>
                        </Card>
                      </div>
                    )}
                  </>
                )
              ) : (
                <h1>Please upload an image</h1>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
}
