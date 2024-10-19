'use client';
import ImageFile from '@/components/image/imageFile';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { imageFileURL } from '@/helpers/imageFileToURL';
import { useGetCities } from '@/hooks/admin/cities/useGetCities';
import { useGetEvents } from '@/hooks/admin/event/useGetEvent';
import { useActionRoom } from '@/hooks/admin/room/useActionRoom';
import { useGetservices } from '@/hooks/admin/service/useGetServices';
import { Room } from '@/services/admin/Room';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function Criar_salao() {
  const { data, result } = useGetCities();
  const { data: events } = useGetEvents();
  const { data: servicesData } = useGetservices();
  const [services, setServices] = useState<string[]>([]);
  const [politicas, setPoliticas] = useState<string[]>(['']);
  const [eventos, setEventos] = useState<string[]>([]);
  const [images, setImages] = useState<FileList[]>([]);
  const [image, setImage] = useState<FileList>();

  const getImage = useCallback((file: FileList) => {
    setImages((prev) => [...prev, file]);
  }, []);

  const { register, handleSubmit } = useForm<Room>();
  const { mutationCreate } = useActionRoom();

  const submitHandler = (data: Room) => {
    data.image = image!;
    // if(eventos.length > 0){
    //   data.
    // }

    if (!image || image.length === 0) {
      toast('Deves selecionar uma imagem principal', {
        type: 'warning',
      });
      return;
    }
  };

  return (
    <div>
      <div className="">
        <h1 className="text-primary font-bold border-l pl-2 uppercase">
          Criar salão
        </h1>
        <div className="pl-2 mt-2 text-[12px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-[12px]">
                  Fornecedor
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/supplier//dashboard-sup"
                  className="text-[12px]"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/supplier/dashboard-sup/saloes"
                  className="text-[12px]"
                >
                  Salões
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="text-[12px]">Criar</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="mt-6">
        <form
          action=""
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-5"
        >
          <fieldset className="border border-border  rounded p-4 flex flex-col gap-5">
            <legend className="mx-2 px-3">Dados do Salão</legend>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2 w-full">
                <label htmlFor="name">Nome do salão</label>
                <Input
                  type="text"
                  placeholder="Nome do salão"
                  {...register('name', { required: true })}
                />
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="name">Capacidade</label>
                <Input
                  type="number"
                  placeholder="Capacidade"
                  {...register('capacity', { required: true })}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2 w-full">
                <label htmlFor="preco">Preço por hora</label>
                <Input
                  type="number"
                  placeholder="Preço por hora"
                  {...register('price_per_hour', { required: true })}
                />
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="name">Hora de abrir</label>
                <Input
                  type="time"
                  placeholder="Nome de abrir"
                  {...register('opening_time', { required: true })}
                />
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="hora-fechar">Hora de fechar</label>
                <Input
                  type="time"
                  placeholder="Hora de fechar"
                  {...register('closing_time', { required: true })}
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="border border-border  rounded p-4 flex flex-col gap-5">
            <legend className="mx-2 px-3">Regras e políticas</legend>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2 w-full">
                <label htmlFor="name">Servços</label>
                <div className="space-y-4">
                  <Select
                    onValueChange={(e) => {
                      if (!services.some((evt) => evt === e))
                        setServices((previes) => [...previes, e]);
                    }}
                  >
                    <SelectTrigger>Serviços</SelectTrigger>
                    <SelectContent>
                      {servicesData &&
                        servicesData.result.map((event, index) => (
                          <SelectItem key={index} value={event.id!.toString()}>
                            {event.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <ul className="list-disc ml-4 space-y-1">
                    {services?.map((evento, index) => (
                      <li className="flex items-center gap-2" key={index}>
                        <div className="size-2 rounded-full bg-primary/20"></div>
                        <span>
                          {' '}
                          {
                            servicesData?.result.find(
                              (evt) => evt.id!.toString() === evento
                            )?.name
                          }
                        </span>
                        <Button
                          type="button"
                          size={'icon'}
                          variant={'outline_desttructive'}
                          onClick={() => {
                            const last = services;
                            last?.splice(index, 1);
                            setServices(() => [...last]);
                          }}
                          className="ml-auto"
                        >
                          <Minus />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="name">Tipos de eventos</label>
                <div className="space-y-4">
                  <Select
                    onValueChange={(e) => {
                      if (!eventos.some((evt) => evt === e))
                        setEventos((previes) => [...previes, e]);
                    }}
                  >
                    <SelectTrigger>Eventos</SelectTrigger>
                    <SelectContent>
                      {events &&
                        events.result.map((event, index) => (
                          <SelectItem key={index} value={event.id!.toString()}>
                            {event.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <ul className="list-disc ml-4 space-y-1">
                    {eventos?.map((evento, index) => (
                      <li className="flex items-center gap-2" key={index}>
                        <div className="size-2 rounded-full bg-primary/20"></div>
                        <span>
                          {' '}
                          {
                            events?.result.find(
                              (evt) => evt.id!.toString() === evento
                            )?.name
                          }
                        </span>
                        <Button
                          type="button"
                          size={'icon'}
                          variant={'outline_desttructive'}
                          onClick={() => {
                            const last = eventos;
                            last?.splice(index, 1);
                            setEventos(() => [...last]);
                          }}
                          className="ml-auto"
                        >
                          <Minus />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2 w-full">
                <label htmlFor="name">Políticas</label>
                <div className="space-y-4">
                  {politicas?.map((politica, index) => (
                    <div className="flex gap-2" key={index}>
                      <Input
                        type="text"
                        placeholder="política"
                        value={politica}
                        onChange={(e) => {
                          politica = e.target.value;
                          const pols = politicas;
                          pols[index] = politica;
                          setPoliticas(() => [...pols]);
                        }}
                      />
                      <Button
                        type="button"
                        size={'icon'}
                        variant={'outline_desttructive'}
                        onClick={() => {
                          if (politicas.length > 1) {
                            const last = politicas;
                            last?.splice(index, 1);
                            setPoliticas(() => [...last]);
                          }
                        }}
                      >
                        <Minus />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => {
                      setPoliticas((previes) => [...previes, '']);
                    }}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="border border-border  rounded p-4 flex flex-col gap-5">
            <legend className="mx-2 px-3">Localidade</legend>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2 w-full">
                <label htmlFor="nunicipio">Município</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Municípios" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {result.isSuccess &&
                      data?.result.map((num, index) => (
                        <SelectItem key={index} value={num.id!.toString()}>
                          {num.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="name">Distrito</label>
                <Input type="number" placeholder="Distrito" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2 w-full">
                <label htmlFor="preco">Rua</label>
                <Input type="text" placeholder="Rua" />
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="name">Ponto de referência</label>
                <Input type="text" placeholder="Ponto de referência" />
              </div>
            </div>
          </fieldset>

          <fieldset className="border border-border  rounded p-4 flex flex-col gap-5">
            <legend className="mx-2 px-3">Imagens</legend>
            <div className="flex flex-col md:flex-row gap-4">
              {!image && <ImageFile onSelectedImage={setImage} />}
              {image && (
                <div className="w-[150px] h-auto relative">
                  <Image
                    alt={image.item(0)!.name}
                    width={150}
                    height={150}
                    className="w-[150px] h-auto rounded cursor-pointer outline-2 hover:outline-dashed outline-red-700 shadow"
                    src={imageFileURL(image.item(0)!)}
                    loading="lazy"
                    onClick={() => {
                      setImage(undefined);
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <h3>Imagens adicionais</h3>
              {images?.length > 0 && (
                <div className="flex flex-wrap items-start gap-3">
                  {images?.map((img, index) => (
                    <Image
                      key={index}
                      alt={img.item(0)!.name}
                      onClick={() => {
                        const last = images;
                        last?.splice(index, 1);
                        setImages(() => [...last]);
                      }}
                      width={150}
                      height={150}
                      src={imageFileURL(img.item(0)!)}
                      className="w-[150px] h-auto rounded cursor-pointer outline-2 hover:outline-dashed outline-red-700 shadow"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
              {/* <div className="space-y-2 w-full">
                <label
                  htmlFor="imagem"
                  className="flex justify-center items-center h-[100px] hover:border-primary/60 w-[100px] rounded border border-dashed"
                >
                  <FilePlus size={40} />
                </label>
                <Input
                  type="file"
                  id="imagem"
                  placeholder="Imagem"
                  className="hidden"
                  onChange={(e) => {
                    getImage(e.currentTarget.files!);
                    e.currentTarget.files = null;
                  }}
                />
              </div> */}
              <ImageFile onSelectedImage={getImage} />
            </div>
          </fieldset>

          <div className="flex gap-4 ml-auto">
            <Button variant={'outline'}>Limpar</Button>
            <Button>Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Criar_salao;
