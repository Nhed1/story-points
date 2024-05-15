"use client";

import { useRouter } from "next/navigation";
import { socket } from "./socket";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";

type Action = "createRoom" | "joinRoom";

const ACTIONS: Action[] = ["createRoom", "joinRoom"];
const ACTIONS_PORTUGUESE: string[] = ["Criar sala", "Entrar em uma sala"];

export default function Home() {
  const form = useForm({
    defaultValues: {
      roomName: "",
      actionSelected: "createRoom",
      user: "",
    },
  });

  const { push } = useRouter();

  const handleRoomAction = (action: Action, roomName: string) =>
    socket.emit(action, roomName);

  const actionSelectedWatch = form.watch("actionSelected");

  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-200 h-screen">
      <h1 className="mb-4 text-lg font-semibold">Story Point APP</h1>
      <Form {...form}>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="roomName"
              rules={{
                required: {
                  message: "obrigatório",
                  value: true,
                },
              }}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="criar ou entrar em uma sala"
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="user"
              rules={{
                required: {
                  message: "obrigatório",
                  value: true,
                },
              }}
              render={({ field }) => (
                <Input type="text" placeholder="nome do usuário" {...field} />
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="actionSelected"
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-2"
                name="action"
              >
                {ACTIONS.map((action, index) => (
                  <div
                    className="flex mt-4 items-center space-x-2"
                    key={action}
                  >
                    <RadioGroupItem value={action} id={action} />
                    <Label htmlFor={action}>{ACTIONS_PORTUGUESE[index]}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />

          <Button
            type="submit"
            className="mt-6"
            onClick={async () => {
              const result = await form.trigger();

              if (!result) return;

              const actionSelected = form.getValues("actionSelected") as Action;
              const roomName = form.getValues("roomName");

              handleRoomAction(actionSelected, roomName);
              push("story-points-select/" + roomName);
            }}
          >
            {ACTIONS_PORTUGUESE[actionSelectedWatch === "createRoom" ? 0 : 1]}
          </Button>
          {(form.formState.errors.roomName || form.formState.errors.user) && (
            <>
              <p>os campos devem ser preenchidos</p>
            </>
          )}
        </div>
      </Form>
    </div>
  );
}
