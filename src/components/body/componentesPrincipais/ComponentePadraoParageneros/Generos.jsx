import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import '@/css/custom-swiper.css';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

export const ComponenteGenerosDeFilmes = ({ valor }) => {
    return (
        <section className="p-5 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-laranja">Por gênero</h2>
            <p className='text-branco_2 font-light'>esse aqui vai ser tanto para celular quanto para pc</p>
            <div className="flex gap-3 justify-start overflow-x-auto py-5 min-w-full hide-scrollbar">
                <Swiper
                    breakpoints={{
                        300: {
                            slidesPerView: 2,
                            spaceBetween: 25,
                            freeMode: true,
                        },
                        500: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        660: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        },
                        980: {
                            spaceBetween: 10,
                            slidesPerView: 4,
                        },
                        1180: {
                            slidesPerView: 5,
                            spaceBetween: 10
                        },
                    }}
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
                                    <div className="bg-laranja flex-nowrap py-2 rounded-lg my-5 flex items-center justify-center min-w-36">
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

