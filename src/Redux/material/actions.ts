import { generateActionsGroup } from "@Redux/helper";
import { GET_MATERIAL_LIST, LOAD_MORE_MATERIAL_LIST } from "./types";
import { DataPagingPayload } from "@typings/api";
import { Material } from "@typings/material";

export const getMaterialList = generateActionsGroup<
  void,
  DataPagingPayload<Material[]>
>(GET_MATERIAL_LIST);

export const loadMoreMaterialList = generateActionsGroup<
  void,
  DataPagingPayload<Material[]>
>(LOAD_MORE_MATERIAL_LIST);
