"use client";
import { ComponentHeaderNavigation } from '@/components/header/HeaderNavigation';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ComponentActorWorks } from '@/components/body/componentesAtores/AtorObras';
import { ComponentActorDetails } from '@/components/body/componentesAtores/AtoresDetalhes';
import { ComponentLoading } from '@/components/ui/loading/Loading';

const Actors = () => {
    const [actorId, setActorId] = useState('');
    const [actorDetails, setActorDetails] = useState({});
    const [actorImages, setActorImages] = useState({});
    const [actorWorks, setActorWorks] = useState({});
    const searchParams = useSearchParams();

    useState(() => {
        setActorId(searchParams.get('atorId'));
        let id = searchParams.get('id');

        const getActorDetails = async () => {
            if (id) {
                const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
                const BASE_URL = 'https://api.themoviedb.org/3';
                const response = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);
                const images = await fetch(`${BASE_URL}/person/${id}/images?api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);
                const combined_credits = await fetch(`${BASE_URL}/person/${id}/combined_credits?api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);

                if (!combined_credits.ok) {
                    throw new Error("obras não encontradas", combined_credits.statusText);
                };
                if (!response.ok) {
                    throw new Error("ator não encontrado", response.statusText);
                };
                if (!images.ok) {
                    console.log("imagens nao encontradas", images.statusText);
                };

                const data = await response.json();
                const dataImages = await images.json();
                const dataCombined = await combined_credits.json();
                setActorImages(dataImages.profiles);
                setActorDetails(data);
                setActorWorks(dataCombined.cast);
            }
        }

        getActorDetails();
    }, []);

    ;

    return (
        <>
            <ComponentHeaderNavigation sessionName={actorDetails.name} />

            <div className='max-w-screen-xl mx-auto text-branco'>
                {actorDetails  ? <ComponentActorDetails actorDetails={actorDetails} actorImages={actorImages} actorWorks={actorWorks} /> : <ComponentLoading />}
            </div>
        </>
    )
}

export default Actors