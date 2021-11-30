<template>
  <div class="pa-1 accent"
    id="toolButtonContainer"
    >
    <!-- The Edit Tool Group only shown if the user has permission to use a tool in this group.
    Note the use of the transltoolGroupation $t(key_value).-->

    <div id="editMode">
      <v-btn elevation="2"
        v-if="!inEditMode"
        @click="editModeClicked"
        id="editButton">Edit Mode</v-btn>
      <v-btn elevation="2"
        v-else
        @click="editModeClicked"
        id="editButton">User Mode</v-btn>       
    </div>
    

    <div id="EditToolGroup"
      v-show="nonEmptyGroup('edit')">
      <h3 v-if="!inEditMode"
        class="body-1 font-weight-bold">{{ $t("toolGroups.EditTools") }}
      </h3>
      <v-btn v-else
        class="body-1 font-weight-bold cyan accent-1"
        depressed
        x-small
        @click="groupAddAndRemoveDisplayedTools('edit')">Select All -
        {{ $t("toolGroups.EditTools") }}
      </v-btn>
      <v-btn-toggle v-model="actionMode"
        id="edit"
        @change="switchActionMode"
        class="mr-2 d-flex flex-wrap accent">
        <!--- Use Array.filter to select only edit tools -->
        <ToolButton v-for="(button) in buttonList.filter(
            b => b.toolGroup === 'edit' && buttinDisplayList.indexOf(b.displayedName) > -1
          )"
          :key="button.id"
          :button="button"
          :id="button.actionModeValue"
          v-on:displayOnlyThisToolUseMessage="displayOnlyThisToolUseMessageFunc">
        </ToolButton>
      </v-btn-toggle>
    </div>

    <!-- The Display Tool Group only shown if the user has permission to use a tool in this group.
    Note the use of the translation $t(key_value).-->
    <div id="DisplayToolGroup"
      v-show="nonEmptyGroup('display')">
      <h3 v-if="!inEditMode"
        class="body-1 font-weight-bold">
        {{ $t("toolGroups.DisplayTools") }}
      </h3>
      <v-btn v-else
        class="body-1 font-weight-bold cyan accent-1"
        depressed
        x-small
        @click="groupAddAndRemoveDisplayedTools('display')">Select All -
        {{ $t("toolGroups.DisplayTools") }}
      </v-btn>
      <v-btn-toggle v-model="actionMode"
        id="display"
        @change="switchActionMode"
        class="mr-2 d-flex flex-wrap accent">
        <!--- Use Array.filter to select only basic tools -->
        <ToolButton v-for="(button) in buttonList.filter(
            b => b.toolGroup === 'display' && buttinDisplayList.indexOf(b.displayedName) > -1
          )"
          :key="button.id"
          :button="button"
          :id="button.actionModeValue"
          v-on:displayOnlyThisToolUseMessage="displayOnlyThisToolUseMessageFunc">
        </ToolButton>
      </v-btn-toggle>
    </div>

    <!-- The Basic Tool Group only shown if the user has permission to use a tool in this group.
    Note the use of the translation $t(key_value).-->
    <div id="BasicToolGroup"
      v-show="nonEmptyGroup('basic')">
      <h3 v-if="!inEditMode"
        class="body-1 font-weight-bold">{{ $t("toolGroups.BasicTools") }}
      </h3>
      <v-btn v-else
        class="body-1 font-weight-bold cyan accent-1"
        depressed
        x-small
        @click="groupAddAndRemoveDisplayedTools('basic')">Select All -
        {{ $t("toolGroups.BasicTools") }}
      </v-btn>
      <v-btn-toggle v-model="actionMode"
        id="basic"
        @change="switchActionMode"
        class="mr-2 d-flex flex-wrap accent">
        <!--- Use Array.filter to select only basic tools -->
        <ToolButton v-for="(button) in buttonList.filter(
            b => b.toolGroup === 'basic' && buttinDisplayList.indexOf(b.displayedName) > -1
          )"
          :key="button.id"
          :button="button"
          :id="button.actionModeValue"
          v-on:displayOnlyThisToolUseMessage="displayOnlyThisToolUseMessageFunc">
        </ToolButton>
      </v-btn-toggle>
    </div>

    <!-- The Construction Tool Group only shown if the user has permission to use a tool in this group.
    Note the use of the translation $t(key_value).-->
    <div id="ConstructionToolGroup"
      v-show="nonEmptyGroup('construction')">
      <h3 v-if="!inEditMode"
        class="body-1 font-weight-bold">
        {{ $t("toolGroups.ConstructionTools") }}
      </h3>
      <v-btn v-else
        class="body-1 font-weight-bold cyan accent-1"
        depressed
        x-small
        @click="groupAddAndRemoveDisplayedTools('construction')">Select All
        - {{ $t("toolGroups.ConstructionTools") }}
      </v-btn>
      <v-btn-toggle v-model="actionMode"
        @change="switchActionMode"
        id="construction"
        class="mr-2 d-flex flex-wrap accent">
        <!--- Use Array.filter to select only basic tools -->
        <ToolButton v-for="(button) in buttonList.filter(
            b => b.toolGroup === 'construction' && buttinDisplayList.indexOf(b.displayedName) > -1
          )"
          :key="button.id"
          :button="button"
          :id="button.actionModeValue"
          v-on:displayOnlyThisToolUseMessage="displayOnlyThisToolUseMessageFunc">
        </ToolButton>
      </v-btn-toggle>
    </div>

    <!-- 
      The Measurement Tool Group only shown if the user has permission to use a tool in this 
      group. Note the use of the translation $t(key_value).
    -->
    <div id="MeasurementToolGroup"
      v-show="nonEmptyGroup('measurement')">
      <h3 v-if="!inEditMode"
        class="body-1 font-weight-bold">
        {{ $t("toolGroups.MeasurementTools") }}
      </h3>
      <v-btn v-else
        class="body-1 font-weight-bold cyan accent-1"
        depressed
        x-small
        @click="groupAddAndRemoveDisplayedTools('measurement')">Select All
        - {{ $t("toolGroups.MeasurementTools") }}
      </v-btn>
      <v-btn-toggle v-model="actionMode"
        id="measurement"
        @change="switchActionMode"
        class="mr-2 d-flex flex-wrap accent">
        <ToolButton v-for="(button) in buttonList.filter(
            b => b.toolGroup === 'measurement' && buttinDisplayList.indexOf(b.displayedName) > -1
          )"
          :key="button.id"
          :button="button"
          :id="button.actionModeValue"
          v-on:displayOnlyThisToolUseMessage="displayOnlyThisToolUseMessageFunc">
        </ToolButton>
      </v-btn-toggle>
    </div>

    <!-- 
      The Advanced Tool Group only shown if the user has permission to use a tool in this 
      group. Note the use of the translation $t(key_value).
    -->
    <div id="AdvanceToolGroup"
      v-show="nonEmptyGroup('advanced')">
      <h3 v-if="!inEditMode"
        class="body-1 font-weight-bold">
        {{ $t("toolGroups.AdvancedTools") }}
      </h3>
      <v-btn v-else
        class="body-1 font-weight-bold cyan accent-1"
        depressed
        x-small
        @click="groupAddAndRemoveDisplayedTools('advanced')">Select All -
        {{ $t("toolGroups.AdvancedTools") }}
      </v-btn>
      <v-btn-toggle v-model="actionMode"
        id="advanced"
        @change="switchActionMode"
        class="mr-2 d-flex flex-wrap accent">
        <!--- Use Array.filter to select only advanced tools -->
        <ToolButton v-for="(button) in buttonList.filter(
            b => b.toolGroup === 'advanced' && buttinDisplayList.indexOf(b.displayedName) > -1
          )"
          :key="button.id"
          :button="button"
          :id="button.actionModeValue"
          v-on:displayOnlyThisToolUseMessage="displayOnlyThisToolUseMessageFunc">
        </ToolButton>
      </v-btn-toggle>
    </div>

    <!-- 
      The Transformational Tool Group only shown if the user has permission to use a tool in this 
      group. Note the use of the translation $t(key_value).
    -->
    <div id="TransformationalToolGroup"
      v-show="nonEmptyGroup('transformational')">
      <h3 v-if="!inEditMode"
        class="body-1 font-weight-bold">
        {{ $t("toolGroups.TransformationalTools") }}
      </h3>
      <v-btn v-else
        class="body-1 font-weight-bold cyan accent-1"
        depressed
        x-small
        @click="groupAddAndRemoveDisplayedTools('transformational')">Select
        All - {{ $t("toolGroups.TransformationalTools") }}
      </v-btn>
      <v-btn-toggle v-model="actionMode"
        id="transform"
        @change="switchActionMode"
        class="mr-2 d-flex flex-wrap accent">
        <ToolButton v-for="(button) in buttonList.filter(
            b => b.toolGroup === 'transformation' && buttinDisplayList.indexOf(b.displayedName) > -1
          )"
          :key="button.id"
          :button="button"
          :id="button.actionModeValue"
          v-on:displayOnlyThisToolUseMessage="displayOnlyThisToolUseMessageFunc">
        </ToolButton>
      </v-btn-toggle>
    </div>

    <!-- 
      The Conice Tool Group only shown if the user has permission to use a tool in this 
      group. Note the use of the translation $t(key_value).
    -->
    <div id="ConicToolGroup"
      v-show="nonEmptyGroup('conic')">
      <h3 v-if="!inEditMode"
        class="body-1 font-weight-bold">
        {{ $t("toolGroups.ConicTools") }}
      </h3>
      <v-btn v-else
        class="body-1 font-weight-bold cyan accent-1"
        depressed
        x-small
        @click="groupAddAndRemoveDisplayedTools('conic')">Select All -
        {{ $t("toolGroups.ConicTools") }}
      </v-btn>
      <v-btn-toggle v-model="actionMode"
        id="conic"
        @change="switchActionMode"
        class="mr-2 d-flex flex-wrap accent">
        <ToolButton v-for="(button) in buttonList.filter(
            b => b.toolGroup === 'conic' && buttinDisplayList.indexOf(b.displayedName) > -1
          )"
          :key="button.id"
          :button="button"
          :id="button.actionModeValue"
          v-on:displayOnlyThisToolUseMessage="displayOnlyThisToolUseMessageFunc">
        </ToolButton>
      </v-btn-toggle>
    </div>

    <div id="DeveloperToolGroup"
      v-show="nonEmptyGroup('developerOnly') && !inProductionMode">
      <h3 v-if="!inEditMode"
        class="body-1 font-weight-bold">
        {{ $t("toolGroups.DeveloperOnlyTools") }}
      </h3>
      <v-btn v-else
        class="body-1 font-weight-bold cyan accent-1"
        depressed
        x-small
        @click="groupAddAndRemoveDisplayedTools('developerOnly')">Select
        All - {{ $t("toolGroups.DeveloperOnlyTools") }}
      </v-btn>
      <v-btn-toggle v-model="actionMode"
        id="developerOnly"
        @change="switchActionMode"
        class="mr-2 d-flex flex-wrap accent">
        <!--- Use Array.filter to select only edit tools -->
        <ToolButton v-for="(button) in buttonList.filter(
            b => b.toolGroup === 'developerOnly' && buttinDisplayList.indexOf(b.displayedName) > -1
          )"
          :key="button.id"
          :button="button"
          :id="button.actionModeValue"
          :elev="elev"
          v-on:displayOnlyThisToolUseMessage="displayOnlyThisToolUseMessageFunc">
        </ToolButton>
      </v-btn-toggle>
    </div>

  </div>
</template>


<script lang="ts">
import Vue from "vue";
import App from "@/App.vue"
/* Import the components so we can use the class-style vue components in TypeScript. */
import Component from "vue-class-component";
import ToolButton from "@/components/ToolButton.vue";
import { ActionMode, ToolButtonType } from "@/types";
import { SEStore } from "@/store";
/* Import the global settings. */
import SETTINGS from "@/global-settings";
import { Error } from "two.js";
import vuetify from "@/plugins/vuetify";
import SE from "@/store/se-module";

import {
  FirebaseFirestore,
  DocumentReference,
  DocumentSnapshot
} from "@firebase/firestore-types";

/* Declare the components used in this component. */
@Component({
  components: { ToolButton }
})
export default class ToolGroups extends Vue {
  /* Controls the selection of the actionMode using the buttons. The default is segment. */

  private actionMode: { id: ActionMode; name: string } = {
    id: "rotate",
    name: ""
  };

  /* Use the global settings to set the variables bound to the toolTipOpen/CloseDelay */
  private toolTipOpenDelay = SETTINGS.toolTip.openDelay;
  private toolTipCloseDelay = SETTINGS.toolTip.closeDelay;

  private elev = 24;
  private inProductionMode = false;

  /* buttinDisplayList is used to show the customized view after editing
     allButtonDisplayList is used to ensure the edit mode view displays all the tools from buttonList
     inEditMode switches between edit mode and user mode
     colorEditMode is the name of the class assigned to the toolBox elements to change the color in edit mode */

  private buttinDisplayList = SETTINGS.userButtonDisplayList;
  private allButtonDisplayList: string[] = [];
  private inEditMode = false;
  private colorEditMode = "cyan";



  /** Checks to see if a custom tool list has been loaded already. 
   *  If it hasn't, loads all tools.
   *  The tool names are added to global-settings.ts userButtonDisplayList[] which is used to modify the user mode view.
   */
  constructor() {
    super();
    
    if(SETTINGS.userButtonDisplayList.length === 0){
      for(var i = 0; i < this.buttonList.length; i++){
        SETTINGS.userButtonDisplayList.push(this.buttonList[i].displayedName);
        this.allButtonDisplayList.push(this.buttonList[i].displayedName);
      }
    } else {
      for(var i = 0; i < this.buttonList.length; i++){
        this.allButtonDisplayList.push(this.buttonList[i].displayedName);
      }
    } 
  }

  editModeClicked() {
    if (this.inEditMode) {
      this.enterNormalMode();
    } else {
      this.enterEditMode();
      Vue.nextTick(this.changeRemovedButtonColor, {});
    }
  }

  /**Switches the buttons being displayed from all in edit to the custom view in user mode.
   * Changes the colors to show which mode is active.
   * Recurrsive because all elements don't update in a single call.
   */
  enterNormalMode(): void {
    this.inEditMode = false;
    SETTINGS.inEditMode = false;
    this.buttinDisplayList = SETTINGS.userButtonDisplayList;

    let toolEl = document.getElementsByClassName(this.colorEditMode);

    for (var i = 0; i < toolEl.length; i++) {
      toolEl[i].classList.replace(this.colorEditMode, "accent");
    }
    if (document.getElementsByClassName(this.colorEditMode).length > 0) {
      this.enterNormalMode();
    }
  }

  /**Switches the Buttons being displayed from the custom user view to all in edit mode.
   * Changes color to show which mode is active.
   * Recurrsive because all elements don't update in a single call.
   */
  enterEditMode(): void {
    SETTINGS.inEditMode = true;

    this.buttinDisplayList = this.allButtonDisplayList;
    

    let toolEl = document.getElementsByClassName("accent");
    this.inEditMode = true;

    for (var i = 0; i < toolEl.length; i++) {
      toolEl[i].classList.replace("accent", this.colorEditMode);
    }
    if (document.getElementsByClassName("accent").length > 0) {
      this.enterEditMode();
    }
  }

  /**Checks the which buttons are disabled in the user mode and changes thier color to show that.
   * This is a separeate function from enterEditMode because Vue needs to update to display the removed
   * buttons before thier colors can be changed.
   */
  changeRemovedButtonColor(): void {
    for (var i = 0; i < this.buttonList.length; i++) {
      if (
        SETTINGS.userButtonDisplayList.indexOf(
          this.buttonList[i].displayedName
        ) === -1
      ) {
        document
          .querySelector("#" + this.buttonList[i].actionModeValue)
          ?.classList.add("grey");
      }
    }
  }

  created(): void {
    this.inProductionMode = process.env.NODE_ENV === "production";
  }

  /* Writes the current state/edit mode to the store, where the Easel view can read it. 
      If the inEditMode flag is set to true, the current state/edit button is removed from user mode view.*/
  switchActionMode(): void {
    if (this.inEditMode) {
      this.addAndRemoveDisplayedTools();
    } else {
      SEStore.setActionMode(this.actionMode);
    }
  }

  /** While in edit mode, adds/removes the name of the clicked toolButton to the global-settings.ts
   * to customize the user mode view and changes the color of the button to indicate if its added or removed. */
  addAndRemoveDisplayedTools(): void {
    if (SETTINGS.userButtonDisplayList.includes(this.actionMode.name)) {
      SETTINGS.userButtonDisplayList.splice(
        SETTINGS.userButtonDisplayList.indexOf(this.actionMode.name),
        1
      );
      document
        .querySelector("#" + this.actionMode.id)
        ?.classList.add("grey");
    } else {
      SETTINGS.userButtonDisplayList.push(this.actionMode.name);
      document.querySelector("#" + this.actionMode.id)?.classList.remove("grey");
    }

  }

  /**Removes the entire tool group selected from the user mode display unless all tools are already removed,
   * then the entire group is added back.
   */
  groupAddAndRemoveDisplayedTools(groupName: string) {
    for (var i = 0; i < this.buttonList.length; i++) {
      if (
        this.buttonList[i].toolGroup === groupName &&
        !SETTINGS.userButtonDisplayList.includes(
          this.buttonList[i].displayedName
        )
      ) {
        this.removeAllTools(groupName);
        return;
      }
    }
    this.addAllTools(groupName);
  }

  /**Checks if every tool name in the given group is in userButtonDisplayList to prevent duplication.
   * Then adds any that are missing and changes thier color to indicate thier removal from user mode.
   */
  removeAllTools(groupName: string): void {
    for (var i = 0; i < this.buttonList.length; i++) {
      if (this.buttonList[i].toolGroup === groupName) {
        if (
          !SETTINGS.userButtonDisplayList.includes(
            this.buttonList[i].displayedName
          )
        ) {
          SETTINGS.userButtonDisplayList.push(this.buttonList[i].displayedName);
          document
            .querySelector("#" + this.buttonList[i].actionModeValue)
            ?.classList.remove("grey");
        }
      }
    }
  }

  /**Checks if a tool name from the group provided is in userButtonDisplayList then removes it.
   * This allows it to be displayed in user mode again and changes the color to indicate this.
   */
  addAllTools(groupName: string): void {
    for (var i = 0; i < this.buttonList.length; i++) {
      if (this.buttonList[i].toolGroup === groupName) {
        if (
          SETTINGS.userButtonDisplayList.includes(
            this.buttonList[i].displayedName
          )
        ) {
          SETTINGS.userButtonDisplayList.splice(
            SETTINGS.userButtonDisplayList.indexOf(
              this.buttonList[i].displayedName
            ),
            1
          );
          document
            .querySelector("#" + this.buttonList[i].actionModeValue)
            ?.classList.add("grey");
        }
      }
    }
  }

  /* This returns true only if there is at least one tool that needs to be displayed in the group. */
  nonEmptyGroup(groupName: string): boolean {
    return (
      this.buttonList.filter(b => b.toolGroup === groupName).length -
        this.buttonList.filter(
          b =>
            !this.buttinDisplayList.includes(b.displayedName) &&
            b.toolGroup === groupName
        ).length >
      0
    );
  }

  /* This turns off all other snackbar/toolUseMessage displays so that multiple 
  snackbar/toolUseMessages are not displayed at the same time.  */
  displayOnlyThisToolUseMessageFunc(id: number): void {
    // Alternative solution: use Array high-order functions
    this.buttonList
      .filter(btn => btn.id !== id)
      .forEach(btn => {
        btn.displayToolUseMessage = !btn.displayToolUseMessage;
      });
  }

  /* A list of all the buttons that are possible to display/use. Only those that the User has
  permission to use will be available. */
  private buttonList: ToolButtonType[] = [
    {
      id: 0,
      actionModeValue: "point",
      displayedName: "CreatePointDisplayedName",
      icon: "$vuetify.icons.value.point",
      toolTipMessage: "CreatePointToolTipMessage",
      toolUseMessage: "CreatePointToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "basic"
    },
    {
      id: 5,
      actionModeValue: "line",
      displayedName: "CreateLineDisplayedName",
      icon: "$vuetify.icons.value.line",
      toolTipMessage: "CreateLineToolTipMessage",
      toolUseMessage: "CreateLineToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "basic"
    },
    {
      id: 10,
      actionModeValue: "segment",
      displayedName: "CreateLineSegmentDisplayedName",
      icon: "$vuetify.icons.value.segment",
      toolTipMessage: "CreateLineSegmentToolTipMessage",
      toolUseMessage: "CreateLineSegmentToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "basic"
    },
    {
      id: 20,
      actionModeValue: "circle",
      displayedName: "CreateCircleDisplayedName",
      icon: "$vuetify.icons.value.circle",
      toolTipMessage: "CreateCircleToolTipMessage",
      toolUseMessage: "CreateCircleToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "basic"
    },

    {
      id: 0,
      actionModeValue: "select",
      displayedName: "SelectDisplayedName",
      icon: "mdi-cursor-pointer",
      toolTipMessage: "SelectToolTipMessage",
      toolUseMessage: "SelectToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "edit"
    },
    {
      id: 5,
      actionModeValue: "delete",
      displayedName: "DeleteDisplayedName",
      icon: "mdi-delete",
      toolTipMessage: "DeleteToolTipMessage",
      toolUseMessage: "DeleteToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "edit"
    },

    {
      id: 0,
      actionModeValue: "hide",
      displayedName: "HideDisplayedName",
      icon: "mdi-file-hidden",
      toolTipMessage: "HideObjectToolTipMessage",
      toolUseMessage: "HideObjectToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "display"
    },
    {
      id: 5,
      actionModeValue: "toggleLabelDisplay",
      displayedName: "ToggleLabelDisplayedName",
      icon: "mdi-toggle-switch-off-outline",
      toolTipMessage: "ToggleLabelToolTipMessage",
      toolUseMessage: "ToggleLabelToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "display"
    },

    {
      id: 15,
      actionModeValue: "move",
      displayedName: "MoveDisplayedName",
      icon: "mdi-cursor-move",
      toolTipMessage: "MoveObjectToolTipMessage",
      toolUseMessage: "MoveObjectToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "display"
    },
    {
      id: 20,
      actionModeValue: "rotate",
      displayedName: "RotateDisplayedName",
      icon: "mdi-rotate-3d-variant",
      toolTipMessage: "RotateSphereToolTipMessage",
      toolUseMessage: "RotateSphereToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "display"
    },

    {
      id: 25,
      actionModeValue: "zoomIn",
      displayedName: "PanZoomInDisplayedName",
      icon: "mdi-magnify-plus-outline",
      toolTipMessage: "PanZoomInToolTipMessage",
      toolUseMessage: "PanZoomInToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "edit"
    },
    {
      id: 30,
      actionModeValue: "zoomOut",
      displayedName: "PanZoomOutDisplayedName",
      icon: "mdi-magnify-minus-outline",
      toolTipMessage: "PanZoomOutToolTipMessage",
      toolUseMessage: "PanZoomOutToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "edit"
    },
    {
      id: 35,
      actionModeValue: "zoomFit",
      displayedName: "ZoomFitDisplayedName",
      icon: "mdi-magnify-scan",
      toolTipMessage: "ZoomFitToolTipMessage",
      toolUseMessage: "ZoomFitToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "edit"
    },
    {
      id: 0,
      actionModeValue: "midpoint",
      displayedName: "CreateMidpointDisplayedName",
      icon: "$vuetify.icons.value.midpoint",
      toolTipMessage: "CreateMidpointToolTipMessage",
      toolUseMessage: "CreateMidpointToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "construction"
    },
    {
      id: 5,
      actionModeValue: "angleBisector",
      displayedName: "CreateAngleBisectorDisplayedName",
      icon: "$vuetify.icons.value.angleBisector",
      toolTipMessage: "CreateAngleBisectorToolTipMessage",
      toolUseMessage: "CreateAngleBisectorToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "construction"
    },
    {
      id: 15,
      actionModeValue: "antipodalPoint",
      displayedName: "CreateAntipodalPointDisplayedName",
      icon: "$vuetify.icons.value.antipode",
      toolTipMessage: "CreateAntipodalPointToolTipMessage",
      toolUseMessage: "CreateAntipodalPointToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "construction"
    },
    {
      id: 20,
      actionModeValue: "polar",
      displayedName: "CreatePolarDisplayedName",
      icon: "$vuetify.icons.value.polar",
      toolTipMessage: "CreatePolarToolTipMessage",
      toolUseMessage: "CreatePolarToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "construction"
    },
    {
      id: 25,
      actionModeValue: "tangent",
      displayedName: "CreateTangentDisplayedName",
      icon: "$vuetify.icons.value.tangent",
      toolTipMessage: "CreateTangentToolTipMessage",
      toolUseMessage: "CreateTangentToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "construction"
    },
    {
      id: 30,
      actionModeValue: "perpendicular",
      displayedName: "CreatePerpendicularDisplayedName",
      icon: "$vuetify.icons.value.perpendicular",
      toolTipMessage: "CreatePerpendicularToolTipMessage",
      toolUseMessage: "CreatePerpendicularToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "construction"
    },
    {
      id: 50,
      actionModeValue: "intersect",
      displayedName: "CreateIntersectionDisplayedName",
      icon: "$vuetify.icons.value.intersection",
      toolTipMessage: "CreateIntersectionToolTipMessage",
      toolUseMessage: "CreateIntersectionToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "construction"
    },
    {
      id: 45,
      actionModeValue: "pointOnOneDim",
      displayedName: "CreatePointOnOneDimDisplayedName",
      icon: "$vuetify.icons.value.pointOnObject",
      toolTipMessage: "CreatePointOnOneDimToolTipMessage",
      toolUseMessage: "CreatePointOnOneDimToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "construction"
    },
    {
      id: 0,
      actionModeValue: "segmentLength",
      displayedName: "CreateSegmentLengthDisplayedName",
      icon: "$vuetify.icons.value.segmentLength",
      toolTipMessage: "CreateSegmentLengthToolTipMessage",
      toolUseMessage: "CreateSegmentLengthToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "measurement"
    },
    {
      id: 5,
      actionModeValue: "pointDistance",
      displayedName: "CreatePointDistanceDisplayedName",
      icon: "$vuetify.icons.value.pointDistance",
      toolTipMessage: "CreatePointDistanceToolTipMessage",
      toolUseMessage: "CreatePointDistanceToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "measurement"
    },
    {
      id: 10,
      actionModeValue: "angle",
      displayedName: "CreateAngleDisplayedName",
      icon: "$vuetify.icons.value.angle",
      toolTipMessage: "CreateAngleToolTipMessage",
      toolUseMessage: "CreateAngleToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "measurement"
    },
    {
      id: 15,
      actionModeValue: "coordinate",
      displayedName: "CreateCoordinateDisplayedName",
      icon: "mdi-axis-arrow-info",
      toolTipMessage: "CreateCoordinateToolTipMessage",
      toolUseMessage: "CreateCoordinateToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "measurement"
    },
    {
      id: 20,
      actionModeValue: "measureTriangle",
      displayedName: "MeasureTriangleDisplayedName",
      icon: "$vuetify.icons.value.measuredTriangle",
      toolTipMessage: "MeasureTriangleToolTipMessage",
      toolUseMessage: "MeasureTriangleToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "measurement"
    },
    {
      id: 25,
      actionModeValue: "measurePolygon",
      displayedName: "MeasurePolygonDisplayedName",
      icon: "$vuetify.icons.value.measuredPolygon",
      toolTipMessage: "MeasurePolygonToolTipMessage",
      toolUseMessage: "MeasurePolygonToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "measurement"
    },
    {
      id: 0,
      actionModeValue: "ellipse",
      displayedName: "CreateEllipseDisplayedName",
      icon: "$vuetify.icons.value.ellipse",
      toolTipMessage: "CreateEllipseToolTipMessage",
      toolUseMessage: "CreateEllipseToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "conic"
    },
    {
      id: 10,
      actionModeValue: "nSectPoint",
      displayedName: "CreateNSectSegmentDisplayedName",
      icon: "$vuetify.icons.value.nSectPoint",
      toolTipMessage: "CreateNSectSegmentToolTipMessage",
      toolUseMessage: "CreateNSectSegmentToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "advanced"
    },
    {
      id: 15,
      actionModeValue: "nSectLine",
      displayedName: "CreateNSectAngleDisplayedName",
      icon: "$vuetify.icons.value.nSectLine",
      toolTipMessage: "CreateNSectAngleToolTipMessage",
      toolUseMessage: "CreateNSectAngleToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "advanced"
    },
    {
      id: 0,
      actionModeValue: "iconFactory",
      displayedName: "CreateIconDisplayedName",
      icon: "mdi-plus",
      toolTipMessage: "CreateIconToolTipMessage",
      toolUseMessage: "CreateIconToolUseMessage",
      displayToolUseMessage: false,
      toolGroup: "developerOnly"
    }

    //sort the button list by id so that we don't have to reorder the list each item we add a new button
  ].sort((a: ToolButtonType, b: ToolButtonType) => {
    if (a.toolGroup === b.toolGroup) {
      if (a.id > b.id) {
        return 1;
      } else {
        return -1;
      }
    }
    if (a.toolGroup > b.toolGroup) {
      return 1;
    } else {
      return -1;
    }
  });
}
</script>

<style lang="scss"></style>