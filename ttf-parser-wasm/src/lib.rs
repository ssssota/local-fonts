mod utils;

use std::collections::HashMap;

use ttf_parser::{name_id, Language, PlatformId};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(start)]
pub fn run() {
    utils::set_panic_hook();
}

#[wasm_bindgen]
pub struct FontNames(HashMap<u16, String>);

#[wasm_bindgen]
impl FontNames {
    #[wasm_bindgen(getter)]
    #[inline]
    pub fn family(&self) -> Option<String> {
        self.0.get(&name_id::FAMILY).cloned()
    }
    #[wasm_bindgen(getter)]
    #[inline]
    pub fn subfamily(&self) -> Option<String> {
        self.0.get(&name_id::SUBFAMILY).cloned()
    }
    #[wasm_bindgen(getter, js_name=fullName)]
    #[inline]
    pub fn full_name(&self) -> Option<String> {
        self.0.get(&name_id::FULL_NAME).cloned()
    }
    #[wasm_bindgen(getter, js_name=postscriptName)]
    #[inline]
    pub fn postscript_name(&self) -> Option<String> {
        self.0.get(&name_id::POST_SCRIPT_NAME).cloned()
    }
    #[wasm_bindgen(getter)]
    #[inline]
    pub fn version(&self) -> Option<String> {
        self.0.get(&name_id::VERSION).cloned()
    }
    #[wasm_bindgen(getter, js_name=copyrightNotice)]
    #[inline]
    pub fn copyright_notice(&self) -> Option<String> {
        self.0.get(&name_id::COPYRIGHT_NOTICE).cloned()
    }
    #[wasm_bindgen(getter)]
    #[inline]
    pub fn description(&self) -> Option<String> {
        self.0.get(&name_id::DESCRIPTION).cloned()
    }
    #[wasm_bindgen(getter)]
    #[inline]
    pub fn designer(&self) -> Option<String> {
        self.0.get(&name_id::DESIGNER).cloned()
    }
    #[wasm_bindgen(getter, js_name=designerUrl)]
    #[inline]
    pub fn designer_url(&self) -> Option<String> {
        self.0.get(&name_id::DESIGNER_URL).cloned()
    }
    #[wasm_bindgen(getter)]
    #[inline]
    pub fn license(&self) -> Option<String> {
        self.0.get(&name_id::LICENSE).cloned()
    }
    #[wasm_bindgen(getter, js_name=licenseUrl)]
    #[inline]
    pub fn license_url(&self) -> Option<String> {
        self.0.get(&name_id::LICENSE_URL).cloned()
    }
    #[wasm_bindgen(getter)]
    #[inline]
    pub fn trademark(&self) -> Option<String> {
        self.0.get(&name_id::TRADEMARK).cloned()
    }
    #[wasm_bindgen(getter)]
    #[inline]
    pub fn manufacturer(&self) -> Option<String> {
        self.0.get(&name_id::MANUFACTURER).cloned()
    }
    #[wasm_bindgen(getter, js_name=vendorUrl)]
    #[inline]
    pub fn vendor_url(&self) -> Option<String> {
        self.0.get(&name_id::VENDOR_URL).cloned()
    }
    #[wasm_bindgen(getter, js_name=sampleText)]
    #[inline]
    pub fn sample_text(&self) -> Option<String> {
        self.0.get(&name_id::SAMPLE_TEXT).cloned()
    }
}

#[wasm_bindgen]
pub fn parse(data: &[u8], index: u32) -> Result<FontNames, JsValue> {
    let face = ttf_parser::Face::parse(data, index).map_err(|e| e.to_string())?;
    let mut map = HashMap::<u16, String>::new();
    for name in face.names().into_iter() {
        if !map.contains_key(&name.name_id) || name.language() == Language::English_UnitedStates {
            if let Ok(decoded) = ttf_name_decoder::decode(
                name.name,
                match name.platform_id {
                    PlatformId::Unicode => 0,
                    PlatformId::Macintosh => 1,
                    PlatformId::Iso => 2,
                    PlatformId::Windows => 3,
                    PlatformId::Custom => 4,
                },
                name.encoding_id,
                name.language_id,
            ) {
                map.insert(name.name_id, decoded);
            } else if let Some(decoded) = name.to_string() {
                map.insert(name.name_id, decoded);
            }
        }
    }
    Ok(FontNames(map))
}

#[wasm_bindgen(js_name = fontsInCollection)]
#[inline]
pub fn fonts_in_collection(data: &[u8]) -> Option<u32> {
    ttf_parser::fonts_in_collection(data)
}
