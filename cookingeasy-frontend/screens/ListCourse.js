import React from "react";
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  useToast,
  NativeBaseProvider,
  ScrollView,
} from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";
import { useState } from "react";
import Menu from "../component/menu";

const Example = () => {
  const instState = [
    {
      title: "Oignon",
      isCompleted: true,
    },
    {
      title: "Persil",
      isCompleted: false,
    },
    {
      title: "Oeufs",
      isCompleted: false,
    },
    {
      title: "Pomme de terre",
      isCompleted: false,
    },
  ];
  const [list, setList] = useState(instState);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const addItem = (title) => {
    if (title === "") {
      toast.show({
        title: "Veuillez entrer un élément",
        status: "warning",
      });
      return;
    }

    setList((prevList) => {
      return [
        ...prevList,
        {
          title: title,
          isCompleted: false,
        },
      ];
    });
  };


  const handleDelete = (index) => {
    setList((prevList) => {
      const temp = prevList.filter((_, itemI) => itemI !== index);
      return temp;
    });
  };

  const handleStatusChange = (index) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList[index].isCompleted = !newList[index].isCompleted;
      return newList;
    });
  };

  return (
    <Center w="100%">
      <Box maxW="300" w="100%">
        <Heading mb="2" size="md" marginTop={"10%"}>
          Ma liste de Course
        </Heading>
        <VStack space={4}>
          <HStack space={2}>
            <Input
              flex={1}
              onChangeText={(v) => setInputValue(v)}
              value={inputValue}
              placeholder="Ajouter ..."
              backgroundColor="white"
            />
            <IconButton
              borderRadius="sm"
              variant="solid"
              backgroundColor="#F4511E"
              icon={
                <Icon as={Feather} name="plus" size="sm" color="warmGray.50" backgroundColor="#F4511E" />
              }
              onPress={() => {
                addItem(inputValue);
                setInputValue("");
              }}
            />
          </HStack>
          <VStack space={2}>
            {list.map((item, itemI) => (
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={item.title + itemI.toString()}
              >
                <Checkbox
                  aria-label="Close"
                  isChecked={item.isCompleted}
                  onChange={() => handleStatusChange(itemI)}
                  value={item.title}
                  color="#F4511E"
                  backgroundColor={item.isCompleted ? "#F4511E" : undefined}
                  borderColor={item.isCompleted ? "#F4511E" : "#F4511E"}
                  borderWidth="2"
                  colorScheme="white"
                ></Checkbox>
                <Text
                  width="100%"
                  flexShrink={1}
                  textAlign="left"
                  mx="2"
                  strikeThrough={item.isCompleted}
                  _light={{
                    color: item.isCompleted ? "#F4511E" : "coolGray.800",
                  }}
                  _dark={{
                    color: item.isCompleted ? "#F4511E" : "white",
                  }}
                  onPress={() => handleStatusChange(itemI)}
                >
                  {item.title}
                </Text>
                <IconButton
                  size="sm"
                  colorScheme="trueGray"
                  icon={
                    <Icon as={Entypo} name="minus" size="xs" color="#F4511E" />
                  }
                  onPress={() => handleDelete(itemI)}
                />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <ScrollView>
        <Menu />

        <Center flex={1} px="3">
          <Example />
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};
