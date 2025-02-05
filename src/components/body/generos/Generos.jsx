import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../css/custom-swiper.css';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';


export const ComponenteGeneros = ({ valor }) => {
    return (
        <section className="p-5 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-laranja">Por gênero</h2>
            <p className='text-branco_2 font-light'>navegue pelo conteúdo dividido por genero</p>
            <div className="flex gap-3 justify-start overflow-x-auto py-5 min-w-full hide-scrollbar">
                {valor.map((genero) => {
                    return (
                        <Link href={''}>
                            <div className="bg-laranja flex-nowrap py-2 rounded-lg my-5 flex items-center justify-center min-w-36">
                                <h3 className="text-black font-semibold flex">{genero.name}</h3>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

export const ComponenteGenerosPc = ({ valor }) => {
    return (
        <section className="p-5 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-laranja">Por gênero</h2>
            <p className='text-branco_2 font-light'>navegue pelo conteúdo dividido por genero</p>
            <div className="flex gap-3 justify-start overflow-x-auto py-5 min-w-full hide-scrollbar">
                <Swiper
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    spaceBetween={30}
                    slidesPerView={5}>
                    {valor.map((genero) => {
                        return (
                            <SwiperSlide key={genero.id}>
                                <Link href={''}>
                                    <div className="bg-laranja flex-nowrap py-2 rounded-lg my-5 flex items-center justify-center">
                                        <h3 className="text-black font-semibold flex">{genero.name}</h3>
                                    </div>

                                </Link>
                            </SwiperSlide>
                        );
                    })}
                    <div>
                        <FaChevronCircleRight className="swiper-button-next botão-swiper" />
                    </div>
                    <div >
                        <FaChevronCircleLeft className="swiper-button-prev botão-swiper" />
                    </div>

                </Swiper>
            </div>
        </section>
    );
}